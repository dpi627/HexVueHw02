<template>
  <h1>{{ pageTitle }}</h1>
  <h2>Sign Up</h2>
  <input type="text" v-model="signUpModel.email">
  <input type="text" v-model="signUpModel.password">
  <input type="text" v-model="signUpModel.nickname">
  <button type="button">Sign Up</button>
  <br />
  {{ signUpModel }}
</template>

<script setup>
import { ref } from 'vue';

const pageTitle = ref('Todo');

const signUpModel = ref({
  email: 'Brian',
  password: 'P@ssw0rd',
  nickname: 'dpi'
});
</script>