<template>
  <q-page-container>
    <q-form @submit.prevent="login">
      <div class="title">Вход</div>
      <q-input
        placeholder="Имя пользователя"
        type="text"
        v-model="form.username"
      />
      <q-input placeholder="Пароль" type="password" v-model="form.password" />
      <button type="submit">Войти</button>
    </q-form>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue";
import userApi from "../sdk/user";

const emit = defineEmits(["auth"]);

const form = ref({
  username: "",
  password: "",
});

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
