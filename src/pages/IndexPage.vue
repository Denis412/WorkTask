<template>
  <q-page style="min-height: 100vh">
    <SignInPage v-if="!user" @auth="setCurrentUser" />
    <ChatPage v-else :username="user.username" :secret="user.secret" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import Chat from "../components/Chat.vue";
import ChatPage from "./ChatPage.vue";
import SignInPage from "./SignInPage.vue";

const user = ref(null);

const setCurrentUser = (signedUser) => {
  console.log("user", signedUser);
  user.value = signedUser;
};
</script>
