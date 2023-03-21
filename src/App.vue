<template>
  <router-view />
</template>

<script setup>
import { ref } from "vue";
import SignInPage from "./pages/SignInPage.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import ChatPage from "./pages/ChatPage.vue";

const user = ref(null);

const setCurrentUser = (signedUser) => {
  user.value = signedUser;
};
</script>
