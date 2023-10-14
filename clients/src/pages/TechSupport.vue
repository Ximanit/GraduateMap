<template>
  <div style="margin-top: 160px">
    <div style="margin-left: 104px; margin-top: 20px">
      <div class="text-h5">Техническая поддержка</div>

      <div class="link-cont">
        <div class="link">Как открыть карту?</div>
        <div class="link">
          Можно ли поменять цвет у маркеров и как это сделать?
        </div>
        <div class="link">Где находится секретный режим гигачада?</div>
      </div>

      <div class="under-link">
        Если Вы не нашли ответ в представленных выше вариантах, отправьте письмо
        с интересующим вопросом и Вам обязательно на него ответят
      </div>
    </div>

    <q-card class="tech_sup-card">
      <q-card-section v-if="!sendProcessStart">
        <q-form class="q-px-md q-py-md my-card">
          <q-input v-model="username" label="Имя пользователя" />
          <q-input v-model="theme" label="Тема обращения" />
          <q-input
            v-model="text"
            type="textarea"
            label="Ваши вопросы и предложения"
          />
          <div class="row q-pt-lg justify-end">
            <q-btn flat class="button" @click="sendMail" label="Отправить" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section v-if="sendProcessStart && showSpinner">
        <div class="text-center">
          <q-spinner-gears size="100px" color="primary"></q-spinner-gears>
          <div>Идет отправка сообщения</div>
        </div>
      </q-card-section>
      <q-card-section v-if="sendProcessStart && !showSpinner">
        <div class="text-center">
          <div class="text-h4" style="opacity: 0.5">{{ this.sendResult }}</div>
          <q-btn
            class="text-h6 button"
            style="opacity: 0.5"
            unelevated
            @click="semdMore"
            label="Отправить еще одно обращение"
            no-caps
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { api } from "../boot/axios";

export default {
  data() {
    return {
      sendProcessStart: false,
      theme: "",
      username: "",
      text: "",
      show: false,
      showSpinner: false,
      sendResult: "",
      auth: "12GradMapAdmin345SRscx:23pdmtF334slkRDcS5EREc2",
    };
  },
  methods: {
    clearForm() {
      this.theme = "";
      this.text = "";
      this.username = "";
    },
    semdMore() {
      this.sendProcessStart = false;
      this.clearForm();
    },
    showModal() {
      this.show = true;
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.message = "Ваше сообщение успешно отпправлено!";
        setTimeout(() => {
          this.show = false;
          this.message = "";
        }, 2000);
      }, 3000);
    },
    async sendMail() {
      if (this.username == "") {
        this.$q.notify({
          type: "negative",
          message: "Вы не ввели свою контактную информацию",
        });
        return;
      }
      if (this.theme == "") {
        this.$q.notify({
          type: "negative",
          message: "Вы не ввели тему обращения",
        });
        return;
      }
      if (this.message == "") {
        this.$q.notify({
          type: "negative",
          message: "Вы не текст сообщения",
        });
        return;
      }
      try {
        this.showSpinner = true;
        this.sendProcessStart = true;
        const res = await api.post(
          "api/mail/send",
          {
            email: this.username,
            subject: this.theme,
            message: this.text,
          },
          {
            headers: {
              Authorization: "Basic " + btoa(this.auth),
              "x-requested-with": "*",
            },
          }
        );
        this.showSpinner = false;
        this.sendResult =
          "Доставкой вашего письма занимается наш самый ответственный сотрудик!";
      } catch (error) {
        this.showSpinner = false;
        this.sendResult = "При отправке сообщения возникла ошибка.";
      }
    },
  },
};
</script>
<style scoped>
.button {
  background-color: #273a48;
  color: #fff;
}

.link-cont {
  margin: 48px 0px 48px 0px;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.link {
  color: #227bbf;
  gap: 16px;
  font-size: 19px;
}

.under-link {
  color: rgba(39, 58, 72, 0.54);
  font-size: 17px;
  margin-bottom: 48px;
}

.tech_sup-card {
  background-color: rgba(180, 196, 219, 0.64);
  width: 1032px;
  /* height: 380px; */
  margin-left: 288px;
}
.img {
  height: 30%;
  width: 30%;
}
</style>
