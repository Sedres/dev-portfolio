import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useScrollSpy(sectionIds, options = {}) {
  const activeSection = ref(sectionIds[0] ?? null)

  const isProgrammaticScroll = ref(false)
  let programmaticScrollTimeoutId = null

  const sectionVisibilityRatioById = new Map()
  const observedSectionIdSet = new Set()

  let intersectionObserver = null
  let domMutationObserver = null

  const rootMargin = options.rootMargin ?? '-20% 0px -55% 0px'
  const programmaticDelayMs = options.programmaticDelayMs ?? 900
  const thresholds =
    options.thresholds ?? Array.from({ length: 21 }, (_, thresholdIndex) => thresholdIndex / 20)

  function createIntersectionObserverIfNeeded() {
    if (intersectionObserver) return

    intersectionObserver = new IntersectionObserver(
      (intersectionEntries) => {
        for (const intersectionEntry of intersectionEntries) {
          const sectionId = intersectionEntry.target?.id
          if (!sectionId) continue

          const visibilityRatio = intersectionEntry.isIntersecting
            ? intersectionEntry.intersectionRatio
            : 0

          sectionVisibilityRatioById.set(sectionId, visibilityRatio)
        }

        updateActiveSectionFromVisibility()
      },
      { root: null, rootMargin, threshold: thresholds },
    )
  }

  function observeSectionIfPresent(sectionId) {
    if (!sectionId || observedSectionIdSet.has(sectionId)) return false

    const sectionElement = document.getElementById(sectionId)
    if (!sectionElement) return false

    createIntersectionObserverIfNeeded()

    intersectionObserver.observe(sectionElement)
    observedSectionIdSet.add(sectionId)
    sectionVisibilityRatioById.set(sectionId, 0)

    return true
  }

  function observeAllPresentSections() {
    for (const sectionId of sectionIds) {
      observeSectionIfPresent(sectionId)
    }
  }

  function allSectionsAreObserved() {
    return observedSectionIdSet.size >= sectionIds.length
  }

  function updateActiveSectionFromVisibility() {
    if (isProgrammaticScroll.value) return

    // UX: si estás arriba del todo, fuerza la primera (hero normalmente)
    if (window.scrollY < 20) {
      activeSection.value = sectionIds[0]
      return
    }

    let mostVisibleSectionId = activeSection.value
    let highestVisibilityRatio = 0

    for (const [sectionId, visibilityRatio] of sectionVisibilityRatioById.entries()) {
      if (visibilityRatio > highestVisibilityRatio) {
        highestVisibilityRatio = visibilityRatio
        mostVisibleSectionId = sectionId
      }
    }

    if (mostVisibleSectionId) activeSection.value = mostVisibleSectionId
  }

  function startMutationObserverUntilAllObserved() {
    if (domMutationObserver) return
    if (allSectionsAreObserved()) return

    domMutationObserver = new MutationObserver(() => {
      observeAllPresentSections()

      // Optimización: una vez enganchadas todas, paramos el observer del DOM
      if (allSectionsAreObserved() && domMutationObserver) {
        domMutationObserver.disconnect()
        domMutationObserver = null
      }
    })

    domMutationObserver.observe(document.body, { childList: true, subtree: true })
  }

  function refresh() {
    // Por si cambias el layout o aparecen secciones por condición
    observeAllPresentSections()
    startMutationObserverUntilAllObserved()
    updateActiveSectionFromVisibility()
  }

  function scrollTo(sectionId) {
    if (!sectionId) return
    activeSection.value = sectionId

    isProgrammaticScroll.value = true
    if (programmaticScrollTimeoutId) window.clearTimeout(programmaticScrollTimeoutId)
    programmaticScrollTimeoutId = window.setTimeout(() => {
      isProgrammaticScroll.value = false
    }, programmaticDelayMs)

    if (sectionId === sectionIds[0]) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  onMounted(() => {
    observeAllPresentSections()
    startMutationObserverUntilAllObserved()

    window.addEventListener('scroll', updateActiveSectionFromVisibility, { passive: true })
    updateActiveSectionFromVisibility()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateActiveSectionFromVisibility)

    if (intersectionObserver) intersectionObserver.disconnect()
    if (domMutationObserver) domMutationObserver.disconnect()

    if (programmaticScrollTimeoutId) window.clearTimeout(programmaticScrollTimeoutId)
  })

  return { activeSection, scrollTo, refresh }
}
