<template>
  <q-page class="center">
    <div id="map" style="width: 1600px; height: 920px"></div>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
  mounted() {
    this.getmap();
  },
  methods: {
    async getmap() {
      var map;

      DG.then(function () {
        map = DG.map("map", {
          center: [54.98, 82.89],
          zoom: 13,
        });

        DG.marker([54.98, 82.89]).addTo(map).bindPopup("Вы кликнули по мне!");
      });
    },
  },
};
</script>
