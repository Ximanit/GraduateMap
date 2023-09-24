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
import { load } from "@2gis/mapgl";

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
      const mapglAPI = await load();
      const map = new mapglAPI.Map("map", {
        center: [37.62199313139937, 55.754172570006155],
        zoom: 18,
        key: "042b5b75-f847-4f2a-b695-b5f58adc9dfd",
      });
      const marker = new mapglAPI.Marker(map, {
        coordinates: [37.62199313139937, 55.754172570006155],
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
