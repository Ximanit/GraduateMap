<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h5 text-center caption-text no-padding">
          Вход в систему
        </div>
      </q-card-section>
      <q-card-section class="no-padding">
        <q-tabs v-model="tab" active-color="white">
          <q-tab name="login" label="Авторизация" @click="changeTab()" />
          <q-tab name="registr" label="Регистрация" @click="changeTab()" />
        </q-tabs>
      </q-card-section>
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
import Registr from "../components/Regestration.vue";
import Login from "../components/Login.vue";
import { ref } from "vue";

export default {
  param: {
    page: {
      type: String,
      default: "login",
    },
  },
  components: {
    Registr,
    Login,
  },
  data() {
    return {
      tab: ref("login"),
      tabPanels: [
        {
          name: "login",
          lable: "Авторизация",
        },
        {
          name: "registr",
          lable: "Регистрация",
        },
      ],
    };
  },

  methods: {
    changeTab() {
      this.$router.push({ name: this.tab });
    },
  },
  beforeMount() {
    this.$router.push({ name: this.tab });
  },
};
</script>

<style scoped>
.text {
  color: rgb(158, 156, 156);
  opacity: 0.8;
}

.caption-text {
  color: #273a48;
  opacity: 1.2;
}

.my-card {
  width: 400px;
  height: 100%;
  background: #cfd9e8;
  border-radius: 24px;
  padding: 32px 40px;
}
</style>
