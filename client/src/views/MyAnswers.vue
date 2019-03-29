<template>
  <div class="container my-answers pt-5 offset-sm-2 col-sm-10" v-if="myAnswers && isLogin == true">
    <h1>My Answers</h1>
    <div class="row answer-list" v-for="(answer,index) in myAnswers" :key="index">
      <div>
        <h3><b>Question : {{answer.questionId.title}}</b></h3>
        <br>
        <h3>
          <b>{{answer.title}}</b>
        </h3>
        <h5 v-html="answer.description"></h5>
        <h5>
          <b>Upvotes:</b>
          {{answer.upvotes.length}}
        </h5>
        <h5>
          <b>Downvotes:</b>
          {{answer.downvotes.length}}
        </h5>
        <br>
        <button @click="showEditForm(answer._id)" class="btn btn-default edit-question">Edit Answer</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.answer-list {
  padding-top: 100px;
}

.my-answers {
  max-width: 1200px;
}

.edit-question {
  padding: 5px 15px;
  font-size: 20px;
}

.edit-question:hover {
  background-color: #000;
  color: #fff;
}
</style>
<script>
import { mapState } from "vuex";
import baseURL from "@/api/baseURL";

export default {
  name: "my-answers",
  created() {
    baseURL
      .get(`/answers?user=${localStorage.getItem("userId")}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(({ data }) => {
        this.$store.commit("setMyAnswers", data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  methods: {
    showEditForm(id) {
      this.$router.push(`/edit-answer/${id}`);
    }
  },
  computed: mapState(["myAnswers", "isLogin"])
};
</script>
