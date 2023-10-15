<template>
  <div class="flex justify-around q-mt-xl">
    <div class="grad_map">Карта выпускника</div>
    <q-btn>Настроить фильтры</q-btn>
    <q-input filled placeholder="Поиск выпускника" style="width: 390px">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <div>
      <q-btn v-if="enter"> Войти </q-btn>
      <q-btn v-else color="primary" label="Basic Menu">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>

  <user-map-vue style="margin: 32px 56px 24px 56px"></user-map-vue>

  <q-btn class="float-right">Сотрудничать</q-btn>
</template>

<script>
import UserMapVue from "src/components/UserMap.vue";
import VueCookies from "vue-cookies";
import { ref } from "vue";

export default {
  data() {
    return {
      enter: true,
    };
  },
  beforeMount() {
    const token = VueCookies.get("token");
    if (token != "") {
      this.enter = false;
    } else {
      this.enter = true;
    }
  },

  components: {
    UserMapVue,
  },
};
</script>

<style lang="css" scoped>
.grad_map {
  display: flex;
  border-radius: 12px;
  background: linear-gradient(273deg, #4a5c6a 0%, #738496 100%);
  color: #f2f2f2;
  font-size: 24px;
  align-items: center;
}
</style>
