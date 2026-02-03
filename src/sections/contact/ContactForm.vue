<template>
  <form action="sendEmail">
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="6">
        <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea v-model="message" :rules="messageRules" label="Message" required></v-textarea>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn color="primary" @click="submitForm">Send</v-btn>
      </v-col>
    </v-row>
  </form>
</template>
