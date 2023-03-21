<template>
  <q-page-container>
    <q-form @submit.prevent="registration">
      <div class="title">Вход</div>
      <q-input
        placeholder="Имя пользователя"
        type="text"
        v-model="form.username"
      />
      <q-input placeholder="Имя" type="text" v-model="form.firstName" />
      <q-input placeholder="Фамилия" type="text" v-model="form.lastName" />
      <q-input placeholder="Email" type="email" v-model="form.email" />
      <q-input placeholder="Пароль" type="password" v-model="form.password" />
      <button type="submit">Зарегистрироваться</button>
    </q-form>
  </q-page-container>
</template>

<script setup>
import { ref } from "vue";
import userApi from "src/sdk/user";

const emit = defineEmits(["auth"]);

const form = ref({
  username: "",
  password: "",
  email: "",
  firstName: "",
  lastName: "",
});

const registration = async () => {
  try {
    const response = await userApi.registration(
      form.value.username,
      form.value.password,
      form.value.email,
      form.value.firstName,
      form.value.lastName
    );

    emit("auth", {
      ...response.data,
      secret: form.value.password,
    });
  } catch (erro) {
    console.log(error);
  }
};
</script>
