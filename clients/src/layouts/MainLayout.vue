<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Карта выпускника </q-toolbar-title>
        <div>Войти<q-btn @click="logout()" flat round icon="logout" /></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="250"
      :breakpoint="600"
    >
      <q-list>
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
            <q-item-section class="text-h7">{{ nav.label }}</q-item-section>
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
          label: "Редактирование данных ",
          route: "dataedit",
          iconName: "storage",
        },
      ],
    };
  },
  setup() {
    const leftDrawerOpen = ref(true);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    navugate(route) {
      this.currentRoute = route;
      this.$router.push({ name: this.currentRoute });
    },
  },
});
</script>
