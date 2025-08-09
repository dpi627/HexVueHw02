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

  <h2>Checkout</h2>
  <button type="button" @click="checkout">Checkout</button>
  <div v-if="userModel.status">
    已登入 {{ userModel.nickname }} ({{ userModel.uid }})
  </div>
  <div v-else>
    未登入
  </div>
  <hr />
  {{ userModel }}
  {{ checkoutRes }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pageTitle = ref('Todo');
const baseURL = 'https://todolist-api.hexschool.io/';

const signUpRes = ref('');
const signInRes = ref('');
const checkoutRes = ref('');

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
    document.cookie = `my-token=${res.data.token}; path=/`;
  }
  catch (error) {
    console.error(error);
  }
}

const userModel = ref({
  status: false,
  uid: '',
  nickname: ''
});

const checkout = async () => {

  const token = document.cookie.replace(/(?:^|.*;\s*)my-token\s*=\s*([^;]*).*$/i, "$1");
  console.log('Token:', token);

  let api = `${baseURL}users/checkout`;
  try {
    const res = await axios.get(api, {
      headers: {
        'Authorization': token
      }
    });
    checkoutRes.value = res;
    userModel.value = res.data;
  }
  catch (error) {
    console.log(error);
    userModel.value.status = false;
  }
}

const setRandomEmail = () => {
  let rnd = Math.random().toString(36).substring(2, 8);
  signUpModel.value.email = `${rnd}@gmail.com`;
  signUpModel.value.password = rnd;
  signUpModel.value.nickname = rnd;

  signInModel.value.email = signUpModel.value.email;
  signInModel.value.password = signUpModel.value.password;
}

onMounted(() => {
  setRandomEmail();
});

onMounted(async () => {
  await checkout();
})
</script>