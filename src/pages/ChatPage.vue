<template>
  <div style="height: 100vh">
    <ChatWindow :projectId="projectId" :username="username" :secret="secret" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";

const projectId = ref("825d2d7b-0d64-4a97-ad5b-f074d475cba3");

const { username, secret } = defineProps({
  username: String,
  secret: String,
});

const ChatWindow = applyReactInVue(PrettyChatWindow);
</script>
