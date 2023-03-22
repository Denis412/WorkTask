<template>
  <div class="flex justify-center items-center">
    <q-form class="" @submit.prevent="login">
      <div class="title text-center">Вход</div>
      <div class="flex column">
        <q-input
          placeholder="Имя пользователя"
          type="text"
          v-model="form.username"
        />
        <q-input placeholder="Пароль" type="password" v-model="form.password" />
        <button type="submit">Войти</button>
      </div>
    </q-form>
  </div>
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
