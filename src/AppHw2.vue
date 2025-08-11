<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ pageTitle }}</h1>

    <div class="row">
      <div class="col-md-6">
        <h2>Sign Up</h2>
        <div class="mb-3">
          帳號
          <input type="text" class="form-control" placeholder="Email" v-model="signUpModel.email">
        </div>
        <div class="mb-3">
          密碼
          <input type="password" class="form-control" placeholder="Password" v-model="signUpModel.password">
        </div>
        <div class="mb-3">
          暱稱
          <input type="text" class="form-control" placeholder="Nickname" v-model="signUpModel.nickname">
        </div>
        <button type="button" class="btn btn-primary me-2" @click="signUp">Sign Up</button>
        <button type="button" class="btn btn-secondary" @click="setRandomEmail">Random</button>
        <hr />
        <pre class="bg-light p-2 small">{{ signUpModel }}</pre>
        <hr />
        <pre class="bg-light p-2 small">{{ signUpRes }}</pre>
      </div>

      <div class="col-md-6">
        <h2>Sign In</h2>
        <div class="mb-3">
          帳號
          <input type="text" class="form-control" placeholder="Email" v-model="signInModel.email">
        </div>
        <div class="mb-3">
          密碼
          <input type="password" class="form-control" placeholder="Password" v-model="signInModel.password">
        </div>
        <button type="button" class="btn btn-success" @click="signIn">Sign In</button>
        <hr />
        <pre class="bg-light p-2 small">{{ signInModel }}</pre>
        <hr />
        <pre class="bg-light p-2 small">{{ signInRes }}</pre>
      </div>
    </div>

    <div class="mt-4">
      <h2>Checkout</h2>
      <button type="button" class="btn btn-info" @click="checkout">Checkout</button>
      <div class="mt-3">
        <div v-if="userModel.status" class="alert alert-success">
          已登入 {{ userModel.nickname }} ({{ userModel.uid }})
        </div>
        <div v-else class="alert alert-warning">
          未登入
        </div>
      </div>
      <hr />
      <pre class="bg-light p-2 small">{{ userModel }}</pre>
      <pre class="bg-light p-2 small">{{ checkoutRes }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const pageTitle = ref('Sign Up and Sign In');
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

onMounted(async () => {
  setRandomEmail();
  await checkout();
});
</script>