<template>
  <h1>{{ pageTitle }}</h1>
  <h2>Sign Up</h2>
  <input type="text" v-model="signUpModel.email">
  <input type="password" v-model="signUpModel.password">
  <input type="text" v-model="signUpModel.nickname">
  <button type="button" @click="signUp">Sign Up</button>
  <button type="button" @click="setRandomEmail">Random</button>
  <br />
  {{ signUpModel }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pageTitle = ref('Todo');
const baseURL = 'https://todolist-api.hexschool.io/';

const signUpModel = ref({
  email: '',
  password: '',
  nickname: ''
});

const setRandomEmail = () => {
  let rnd = Math.random().toString(36);
  signUpModel.value.email = `${rnd.substring(2, 8)}@gmail.com`;
  signUpModel.value.password = rnd.substring(2, 8);
  signUpModel.value.nickname = rnd.substring(2, 4);
}

onMounted(() => {
  setRandomEmail();
});

const signUp = async () => {
  try {
    let api = `${baseURL}users/sign_up`;
    const res = await axios.post(api, signUpModel.value);
    console.log(res);
  }
  catch (error) {
    console.error(error);
  }
}
</script>