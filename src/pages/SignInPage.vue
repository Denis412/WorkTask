<template>
  <q-page-container class="flex center">
    <q-form>
      <div class="text-h2">Вход</div>
      <q-btn @click="signInWithGoogle" label="Войти с помощью Google" />
      <q-btn @click="signInWithGitHub" label="Войти с помощью GitHub" />
      <q-btn @click="sugnOut" label="Выход" />
    </q-form>

    <q-btn @click="get"></q-btn>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue";
import userApi from "../sdk/user";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const emit = defineEmits(["auth"]);

const form = ref({
  username: "",
  password: "",
});

const get = async () => {
  console.log(await getAuth(app).currentUser);
};

const sugnOut = () => {
  const auth = getAuth(app);
  signOut(auth).then((response) => console.log("signOut"));
};

const signInWithGitHub = () => {
  const provider = new GithubAuthProvider();
  const auth = getAuth(app);

  signInWithRedirect(auth, provider);
  getRedirectResult(auth).then((result) => {
    console.log("auth", result);
  });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const user = null;

  signInWithRedirect(auth, provider);
  getRedirectResult(auth).then((response) => {
    console.log(response);
    user = response.user;
    console.log(user);
  });

  console.log(user);
};

const login = async () => {
  try {
    const response = await userApi.login(
      form.value.username,
      form.value.password
    );

    emit("auth", {
      ...response.data,
      secret: form.value.password,
    });
  } catch (error) {
    console.log(error);
  }
};
</script>
