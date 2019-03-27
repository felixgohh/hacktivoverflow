<template>
  <div class="container pt-5 offset-sm-2 col-sm-12" v-if="myQuestions && isLogin == true">
    <h1>My Questions</h1>
    <br>
    <br>
    <div class="row" v-for="(question,index) in myQuestions" :key="index">
      <div>
        <h3>
          <b>{{question.title}}</b>
        </h3>
        <h5 v-html="question.description"></h5>
        <h5>
          <b>Upvotes:</b>
          {{question.upvotes.length}}
        </h5>
        <h5>
          <b>Downvotes:</b>
          {{question.downvotes.length}}
        </h5>
        <br>
        <button
          @click="showEditForm(question._id)"
          class="btn btn-default edit-question"
        >Edit Question</button>
        <button
          @click="deleteQuestion(question._id)"
          class="btn btn-default edit-question"
        >Delete Question</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
  name: "my-question",
  created() {
    baseURL
      .get(`/questions?search=${localStorage.getItem("userId")}`, {
        headers: localStorage.getItem("token")
      })
      .then(({ data }) => {
        this.$store.commit("setMyQuestions", data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  },
  methods: {
    showEditForm(id) {
      this.$router.push(`/edit-question/${id}`);
    },
    deleteQuestion(id) {
      baseURL
        .delete(`/questions/${id}`, {
          headers: localStorage.getItem("token")
        })
        .then(({ data }) => {
          this.$router.push("/my-questions");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: mapState(["myQuestions", "isLogin"])
};
</script>
