<template>
  <q-card flat style="background-color: #cfd9e8">
    <q-card-section
      class="q-pa-none q-pt-md"
      style="gap: 10px; display: flex; flex-direction: column"
    >
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
    </q-card-section>

    <q-card-section class="q-pa-none q-pt-md">
      <q-btn flat label="Войти" @click="login" class="button" />
    </q-card-section>
  </q-card>
</template>
<script>
import { api } from "../boot/axios.js";
import VueCookies from "vue-cookies";
import { ref } from "vue";
export default {
  data() {
    return {
      username: "",
      password: "",
      isPwd: ref(true),
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
        message: error.response.data.message ?? "Ошибка сервера",
      });
    },
    async login() {
      if (this.username == "") {
        this.$q.notify({
          type: "negative",
          message: "Введите логин",
        });
        return;
      }
      if (this.password == "") {
        this.$q.notify({
          type: "negative",
          message: "Введите пароль",
        });
        return;
      }
      try {
        const response = await api.post("auth/login", {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;
        const username = this.username;
        const name = response.data.name;
        const roles = response.data.roles;

        console.log(roles);

        VueCookies.set("token", token, "1h");
        VueCookies.set("uname", name, "10h");
        VueCookies.set("login", username, "10h");
        VueCookies.set("roles", roles, "10h");

        this.$q.notify({
          type: "positive",
          message: "Пользователь успешно авторизован.",
        });

        if (roles[0] == "ADMIN" || roles[0] == "MODERATOR") {
          this.$router.replace("/help");
        } else if (roles[0] == "USER") {
          this.$router.replace("/userMain");
        }

        // this.$router.replace("/");
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
  color: #ffffff;
}
</style>
