<template>
  <div style="margin-top: 100px">
    <div class="text-h6 appl_title">Заполнить анкету</div>
    <div class="app_cont">
      <q-form class="q-px-lg q-py-lg app_form">
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="username"
          label="Ваше имя"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="theme"
          label="E-mail"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="username"
          label="Год выпуска"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="theme"
          label="№ выпускного диплома"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="username"
          label="Учебное учереждение"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="theme"
          label="Направление обучения"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="theme"
          label="Ваш город"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="text"
          label="Ваше место работы/учебы"
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="text"
          label="Обращение к модератору"
          autogrow
        />
        <q-input
          style="border-radius: 8px"
          outlined
          v-model="text"
          type="textarea"
          label="Напутственные слова"
        />
      </q-form>
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        "
      >
        <q-card class="app_card_img">
          <q-card-section class="no-padding">
            <q-img class="app_img" src="../resources/app_pic.png" />
          </q-card-section>
        </q-card>

        <q-btn class="app_img_upload" flat @click="openFileExplorer"
          >Загрузить фотографию</q-btn
        >
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          accept="image/*"
          @change="handleFileUpload"
        />
        <div class="column" style="margin-top: 268px; margin-left: 88px">
          <q-btn
            class="q-mb-sm"
            style="
              width: 275px;
              background: #cbd4e2;
              text-transform: capitalize;
            "
            >Очистить</q-btn
          >
          <q-btn
            style="
              width: 275px;
              background: #273a48;
              color: #ffffff;
              text-transform: capitalize;
            "
            >Отправить заявку</q-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openFileExplorer() {
      this.$refs.fileInput.click(); // Нажатие на элемент input type="file"
    },
    handleFileUpload(event) {
      const file = event.target.files[0]; // Получение выбранного файла
      if (file) {
        // Обработка выбранного файла, например, загрузка на сервер или отображение его на странице
        console.log("Выбран файл:", file.name);
        // В этом месте вы можете выполнить нужную вам логику для загрузки и обработки файла
      }
    },
  },
};
</script>

<style lang="css" scoped>
.app_cont {
  display: flex;
  justify-content: flex-start;
}
.appl_title {
  color: #273a48;
  margin-left: 100px;
}

.app_form {
  margin-left: 100px;
  width: 852px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* align-items: ; */
}

.app_card_img {
  height: 100%;
  max-height: 307px;
  margin-left: 88px;
  margin-top: 25px;
  background: rgba(207, 217, 232, 0.32);
  padding: 32px;
  margin-bottom: 24px;
  width: 275px;
}

.app_img {
  width: 211px;
  height: 100%;
}

.app_img_upload {
  height: 20px;
  color: #227bbf;
  margin-left: 90px;
  font-size: 16px;
}
</style>
