<template>
  <q-page style="min-height: 100vh">
    <div v-if="!user" style="width: 100vw; height: 100vh">
      <SignInPage class="q-mt-md" @auth="setCurrentUser" />
      <SignUpPage class="q-mt-md" @auth="setCurrentUser" />
    </div>
    <ChatPage v-else :username="user.username" :secret="user.secret" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import SignInPage from "./SignInPage.vue";
import SignUpPage from "./SignUpPage.vue";
import ChatPage from "./ChatPage.vue";

const user = ref(null);

const setCurrentUser = (signedUser) => {
  user.value = signedUser;
};
</script>
