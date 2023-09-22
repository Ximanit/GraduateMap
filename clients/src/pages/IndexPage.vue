<template>
  <q-page class="center">
    <div id="map" style="width: 300px; height: 300px"></div>
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
      DG.then(function () {
        DG.map("map", {
          center: [54.98, 82.89],
          zoom: 13,
        });
      });
    },
  },
};
</script>
