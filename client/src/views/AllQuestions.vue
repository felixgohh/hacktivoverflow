<template>
  <div class="container col-sm-12 all-question">
    <div v-for="(question, index) in questionList" :key="index">
      <Card :question="question"/>
    </div>
  </div>
</template>
<style scoped>
.all-question {
  padding: 100px;
}
</style>
<script>
import { mapState } from "vuex";
import Card from "@/components/Card.vue";

export default {
  name: "all-questions",
  components: { Card },
  computed: mapState(["questionList"])
};
</script>
