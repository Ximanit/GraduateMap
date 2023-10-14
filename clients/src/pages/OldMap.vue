<template>
  <q-card style="border-radius: 14px; top: 125px">
    <div id="map"></div>
    <q-dialog v-model="toolbar">
      <q-card
        style="
          width: 623px;
          border-radius: 24px;
          background: #f2f2f2;
          padding: 32px 32px 24px 32px;
        "
      >
        <q-card-section style="padding: 0px">
          <div class="row">
            <q-img
              src="../resources/Gigachad.png"
              style="width: 160px; height: 176px; margin-right: 16px"
              class="col-1"
            />
            <div style="width: 400px" class="col">
              <div
                class="text_main_info"
                style="
                  border-top: 1px solid rgb(104, 102, 102);
                  border-radius: 4px 4px 0px 0px;
                "
              >
                ФИО
              </div>
              <div class="text_main_info">Год выпуска</div>
              <div class="text_main_info">Направление</div>
              <div
                class="text_main_info"
                style="border-radius: 0px 0px 4px 4px"
              >
                Город
              </div>
            </div>
          </div>
          <div style="width: 100%; margin: 16px 0 16px 0px">
            <div
              style="
                border-top: 1px solid rgb(104, 102, 102);
                border-radius: 4px 4px 0px 0px;
              "
              class="text_info"
            >
              Окончил
            </div>
            <div class="text_info">Работа</div>
            <div
              style="border-radius: 0px 0px 4px 4px; height: 70px"
              class="text_info"
            >
              Пару слов от выпускника
            </div>
          </div>

          <q-btn class="btn_info" outline color="black" label="Закрыть" />
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
  width: 100%;
  height: 850px;
}

.text_main_info {
  display: flex;
  height: 44px;

  border-bottom: 1px solid rgb(104, 102, 102);
  border-right: 1px solid rgb(104, 102, 102);
  border-left: 1px solid rgb(104, 102, 102);
  text-align: center;
  color: rgba(35, 35, 35, 0.64);
  font-size: 17px;
  line-height: 28px;
  padding: 8px 16px;
}

.text_info {
  display: flex;
  height: 44px;

  border-bottom: 1px solid rgb(104, 102, 102);
  border-right: 1px solid rgb(104, 102, 102);
  border-left: 1px solid rgb(104, 102, 102);
  text-align: center;
  color: rgba(35, 35, 35, 0.64);
  font-size: 17px;
  line-height: 28px;
  padding: 8px 16px;
}
.btn_info {
  padding: 8px 24px;
  border-radius: 8px;
  margin-bottom: 0px;
  margin-left: 383px;
}
</style>
