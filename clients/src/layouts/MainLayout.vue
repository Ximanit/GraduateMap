<template>
  <q-layout view="lHh Lpr lFf">
    <q-btn
      class="text-capitalize text-h6 fixed-right"
      style="width: 90px; height: 50px; margin: 50px 30px 30px 0px; z-index: 2"
      label="Выйти"
      @click="logout()"
    />

    <q-drawer
      class="test"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      width="280"
      :breakpoint="600"
    >
      <q-list class="bordered">
        <q-img
          src="../resources/image.png"
          class="q-ma-lg"
          style="width: 200px"
        ></q-img>

        <q-separator></q-separator>
        <div v-for="(nav, key) in navigation" :key="key">
          <q-item
            exact
            clickable
            v-ripple
            @click="navugate(nav.route)"
            :active="currentRoute == nav.route"
          >
            <q-item-section avatar>
              <q-icon :name="nav.iconName" />
            </q-item-section>
            <q-item-section class="text-h6">{{ nav.label }}</q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page style="margin: 0px 24px 0px 24px">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import VueCookies from "vue-cookies";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  data() {
    return {
      currentRoute: "",
      navigation: [
        {
          label: "Старая карта",
          route: "oldmap",
          iconName: "map",
          base: true,
        },

        {
          label: "Новая карта",
          route: "newmap",
          iconName: "map",
        },
        {
          label: "Отправить заявку",
          route: "send_appl",
          iconName: "storage",
        },
        {
          label: "Настройки",
          route: "setting",
          iconName: "storage",
        },
        {
          label: "Дополнительная информация",
          route: "more_info",
          iconName: "storage",
        },
        {
          label: "Сотрудничать",
          route: "cooperate",
          iconName: "storage",
        },
        {
          label: "Помощь",
          route: "help",
          iconName: "storage",
        },
      ],
    };
  },
  setup() {
    const leftDrawerOpen = ref(true);
  },
  methods: {
    navugate(route) {
      this.currentRoute = route;
      this.$router.push({ name: this.currentRoute });
    },
    reroute() {
      if (!VueCookies.get("token")) {
        this.$router.replace("/auth");
      }
    },
    logout() {
      if (!VueCookies.get("token")) {
        this.$router.replace("/auth");
      } else {
        VueCookies.remove("token");
        this.$router.replace("/auth");
      }
    },
  },
  beforeMount() {
    this.reroute();
    if (!this.$route.name) {
      this.currentRoute = this.navigation[0].route;
    } else {
      this.currentRoute = this.$route.name;
    }

    if (this.$router.currentRoute.value.fullPath == "/") {
      this.$router.push({ name: this.currentRoute });
    }
  },
  beforeUpdate() {
    this.reroute();
    this.$router.push({ name: this.currentRoute });
  },
});
</script>

<style>
.test {
  background: #cfd9e8;
  box-shadow: 8px 0px 40px 0px rgba(0, 0, 0, 0.25);
}
/*
.header--btn {
  flex: auto;
  text-align: right;
} */
</style>
