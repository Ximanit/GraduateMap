<template>
  <q-card class="shadow-15" style="border-radius: 14px; top: 24px">
    <div id="map"></div>
    <q-dialog v-model="toolbar">
      <q-card
        style="
          max-width: 800px;
          width: 623px;
          height: 450px;
          border-radius: 24px;
          background: #f2f2f2;
        "
      >
        <q-card-section class="row" style="padding: 32px 32px 0px 32px">
          <q-img
            src="../resources/Gigachad.png"
            style="width: 160px; height: 176px; margin-right: 16px"
            class="col-1"
          />
          <div style="width: 400px" class="col">
            <div
              class="text_info"
              style="
                border-top: 1px solid rgb(104, 102, 102);
                border-radius: 4px 4px 0px 0px;
              "
            >
              ФИО
            </div>
            <div class="text_info">ФИО</div>
            <div class="text_info">ФИО</div>
            <div class="text_info" style="border-radius: 0px 0px 4px 4px">
              ФИО
            </div>
          </div>
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

.text_info {
  display: flex;
  width: 383px;
  height: 44px;

  border-bottom: 1px solid rgb(104, 102, 102);
  border-right: 1px solid rgb(104, 102, 102);
  border-left: 1px solid rgb(104, 102, 102);
  text-align: center;
  color: rgba(35, 35, 35, 0.64);
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  padding: 8px 16px;
}
</style>
