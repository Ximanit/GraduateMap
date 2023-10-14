<template>
  <q-card flat style="background-color: #cfd9e8">
    <q-card-section
      class="q-pa-none q-pt-md"
      style="gap: 10px; display: flex; flex-direction: column"
    >
      <q-input
        class="text-weight-medium"
        filled
        v-model="name"
        label="Имя пользователя"
      />
      <!-- <q-separator></q-separator> -->
      <q-input filled v-model="username" label="Логин" />
      <!-- <q-separator></q-separator> -->
      <q-input
        filled
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        label="Пароль"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
      <q-input
        filled
        v-model="password_agan"
        :type="isPwd_1 ? 'password' : 'text'"
        label="Подтверждение пароля"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd_1 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd_1 = !isPwd_1"
          ></q-icon> </template
      ></q-input>
    </q-card-section>
    <q-card-section class="q-pa-none q-pt-md">
      <q-btn flat label="Зарегистрироваться" @click="register" class="button" />
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from "../boot/axios";
import VueCookies from "vue-cookies";
import { ref } from "vue";

export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
      password_agan: "",
      isPwd: ref(true),
      isPwd_1: ref(true),
    };
  },
  methods: {
    onError(error) {
      if (!error.response || !error.response.status) {
        this.$q.notify({
          type: "negative",
          message: "Нет соединения с сервером",
        });
        return;
      }
      this.$q.notify({
        type: "negative",
        message: error.response.data.message ?? "Ошибка при регистрации",
      });
    },
    async register() {
      if (this.name == "") {
        this.$q.notify({
          type: "negative",
          message: "Имя пользователя не указано!",
        });
        return;
      }
      if (this.username == "") {
        this.$q.notify({
          type: "negative",
          message: "Логин не может быть пустым!",
        });
        return;
      }
      if (this.password == "") {
        this.$q.notify({
          type: "negative",
          message: "Введите пароль!",
        });
        return;
      }
      if (this.password.length < 4) {
        this.$q.notify({
          type: "negative",
          message: "Длинна пароля должна ревышать 4 символа!",
        });
        return;
      }
      if (this.password_agan == "") {
        this.$q.notify({
          type: "negative",
          message: "Введите пароль повторно!",
        });
        return;
      }
      if (this.password_agan != this.password) {
        this.$q.notify({
          type: "negative",
          message: "Пароли не совпадают!",
        });
        return;
      }
      try {
        //Регистрация
        await api.post("auth/register", {
          name: this.name,
          username: this.username,
          password: this.password,
        });

        //Авторизация
        const response = await api.post("auth/login", {
          username: this.username,
          password: this.password,
        });

        const token = response.data.token;
        const username = this.username;
        const name = response.data.name;
        VueCookies.set("token", token, "1h");
        VueCookies.set("uname", name, "10h");
        VueCookies.set("login", username, "10h");
        VueCookies.set("token", token, "1h");

        this.$q.notify({
          type: "positive",
          message: "Пользователь успешно зарегистрирован и авторизирован",
        });
        this.$router.replace("/");
      } catch (error) {
        this.onError(error);
      }
    },
  },
};
</script>
<style scoped>
.button {
  background-color: #273a48;
  width: 100%;
  height: 45px;
  color: #ffffff;
}
</style>
