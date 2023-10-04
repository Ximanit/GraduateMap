<template>
  <div class="test">
    <authorization class="absolute-center"></authorization>
  </div>
</template>

<script>
import Authorization from "src/pages/Authorization.vue";

export default {
  components: {
    Authorization,
  },
};
</script>

<style lang="css" scoped>
.test {
  background-color: rgb(80, 88, 75);
}
</style>
