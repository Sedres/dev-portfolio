import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrollSpy(sectionIds, options = {}) {
  const activeSection = ref(sectionIds[0] || null)

  const isProgrammaticScroll = ref(false)
  let programmaticScrollTimeoutId = null

  const sectionVisibilityById = new Map()
  let sectionIntersectionObserver = null

  const observerOptions = {
    root: null,
    rootMargin: options.rootMargin ?? '-20% 0px -55% 0px',
    threshold: options.thresholds ?? Array.from({ length: 21 }, (_, index) => index / 20),
  }

  function scrollTo(sectionId) {
    activeSection.value = sectionId

    isProgrammaticScroll.value = true
    if (programmaticScrollTimeoutId) clearTimeout(programmaticScrollTimeoutId)

    programmaticScrollTimeoutId = setTimeout(() => {
      isProgrammaticScroll.value = false
    }, options.programmaticDelay ?? 900)

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  function updateActiveSection() {
    if (isProgrammaticScroll.value) return

    let mostVisibleSectionId = activeSection.value
    let highestVisibilityRatio = 0

    for (const [sectionId, visibilityRatio] of sectionVisibilityById.entries()) {
      if (visibilityRatio > highestVisibilityRatio) {
        highestVisibilityRatio = visibilityRatio
        mostVisibleSectionId = sectionId
      }
    }

    if (window.scrollY < 20) {
      mostVisibleSectionId = sectionIds[0]
    }

    if (mostVisibleSectionId) {
      activeSection.value = mostVisibleSectionId
    }
  }

  function setupObserver() {
    if (sectionIntersectionObserver) {
      sectionIntersectionObserver.disconnect()
    }

    sectionVisibilityById.clear()

    const elements = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean)

    sectionIntersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const sectionId = entry.target.id
        sectionVisibilityById.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0)
      }
      updateActiveSection()
    }, observerOptions)

    for (const element of elements) {
      sectionIntersectionObserver.observe(element)
      sectionVisibilityById.set(element.id, 0)
    }
  }

  onMounted(() => {
    setupObserver()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateActiveSection)
    if (sectionIntersectionObserver) sectionIntersectionObserver.disconnect()
    if (programmaticScrollTimeoutId) clearTimeout(programmaticScrollTimeoutId)
  })

  return {
    activeSection,
    scrollTo,
  }
}
