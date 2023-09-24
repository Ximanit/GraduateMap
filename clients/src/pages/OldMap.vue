<template>
  <q-card class="shadow-15" style="border-radius: 14px; top: 24px">
    <div id="map"></div>
    <q-dialog v-model="toolbar">
      <q-card>
        <q-toolbar>
          <q-toolbar-title>
            <q-img src="img"></q-img>
          </q-toolbar-title>
        </q-toolbar>

        <q-card-section>
          <p>Первое</p>
          <p>Второе</p>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      toolbar: ref(false),
    };
  },
  name: "IndexPage",
  mounted() {
    this.getmap();
  },
  methods: {
    async getmap() {
      var map, marker1;

      const vueInstance = this; // Сохраняем ссылку на контекст компонента Vue

      DG.then(function () {
        map = DG.map("map", {
          center: [55.754172570006155, 37.62199313139937],
          zoom: 18,
        });

        marker1 = DG.marker([55.754172570006155, 37.62199313139937])
          .addTo(map)
          .on("click", (e) => {
            // Теперь мы можем обратиться к переменной toolbar через vueInstance
            vueInstance.toolbar = true;
            console.log(vueInstance.toolbar);
          });
      });
    },
  },
};
</script>

<style>
#map {
  /* width: 1920px;
  height: 1080px; */
  left: 0px;
  width: 1622px;
  height: 820px;
}
</style>
