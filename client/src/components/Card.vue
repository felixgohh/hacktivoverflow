<template>
  <div class="container col-sm-12 question-card pb-5">
    <div class="row">
      <div class="col-sm-1 box">
        <div>
          <p class="numberAns">{{answerLength}}</p>
          <p>answers</p>
        </div>
      </div>
      <div class="col-sm-1 box">
        <div>
          <p class="numberVote">{{totalVote}}</p>
          <p>votes</p>
        </div>
      </div>
      <div class="col-sm-8 d-flex justify-content-center">
        <div @click="showQuestionDetail(question._id)">
          <h2>
            <a>{{question.title}}</a>
          </h2>
        </div>
      </div>
      <div class="col-sm-2 d-flex justify-content-end">
        <h6 class="asked-by">asked by {{question.userId.first_name}} {{question.userId.last_name}}</h6>
      </div>
    </div>
  </div>
</template>
<style scoped>
.box {
  text-align: center;
  padding-top: 15px;
  border: 4px solid #faf6ed;
  font-size: 18px;
}

.asked-by {
  padding-top: 42px;
}
</style>
<script>
import baseURL from "@/api/baseURL";

export default {
  name: "card",
  data() {
    return {
      totalVote: this.question.upvotes.length - this.question.downvotes.length,
      answerLength: 0
    };
  },
  props: ["question"],
  created() {
    baseURL
      .get(`/answers?search=${this.question._id}`)
      .then(({ data }) => {
        this.answerLength = data.length;
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  methods: {
    showQuestionDetail(id) {
      this.$router.push(`/questions/${id}`)
    },
  }
};
</script>
