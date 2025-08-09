<template>
  <h1>{{ pageTitle }}</h1>

  <h2>Sign Up</h2>
  <input type="text" v-model="signUpModel.email">
  <input type="password" v-model="signUpModel.password">
  <input type="text" v-model="signUpModel.nickname">
  <button type="button" @click="signUp">Sign Up</button>
  <button type="button" @click="setRandomEmail">Random</button>
  <hr />
  {{ signUpModel }}
  <hr />
  {{ signUpRes }}

  <h2>Sign In</h2>
  <input type="text" v-model="signInModel.email">
  <input type="password" v-model="signInModel.password">
  <button type="button" @click="signIn">Sign In</button>
  <hr />
  {{ signInModel }}
  <hr />
  {{ signInRes }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pageTitle = ref('Todo');
const baseURL = 'https://todolist-api.hexschool.io/';

const signUpRes = ref('');
const signInRes = ref('');

const signUpModel = ref({
  email: '',
  password: '',
  nickname: ''
});

const signUp = async () => {
  try {
    let api = `${baseURL}users/sign_up`;
    const res = await axios.post(api, signUpModel.value);
    console.log(res);
    signUpRes.value = res.data;
  }
  catch (error) {
    console.error(error);
  }
}

const signInModel = ref({
  email: '',
  password: ''
});

const signIn = async () => {
  try {
    let api = `${baseURL}users/sign_in`;
    const res = await axios.post(api, signInModel.value);
    console.log(res);
    signInRes.value = res.data;
  }
  catch (error) {
    console.error(error);
  }
}

const setRandomEmail = () => {
  let rnd = Math.random().toString(36);
  signUpModel.value.email = `${rnd.substring(2, 8)}@gmail.com`;
  signUpModel.value.password = rnd.substring(2, 8);
  signUpModel.value.nickname = rnd.substring(2, 4);

  signInModel.value.email = signUpModel.value.email;
  signInModel.value.password = signUpModel.value.password;
}

onMounted(() => {
  setRandomEmail();
});
</script>