<template>
  <div class="container col-sm-12">
    <div class="row">
      <div class="col-sm-2"></div>
      <div class="col-sm-8 question-form">
        <h2>Hi, {{name}}</h2>
        <br>
        <h3>What's your question title?</h3>
        <h6>Your title helps people quickly understand what your question is about so they can answer it.</h6>
        <input
          v-model="title"
          class="form-control"
          type="text"
          name="Question Title"
          placeholder="Your Title.."
        >
        <br>
        <br>
        <h3>Tell us more about your question</h3>
        <h6>Your description gives people the information they need to help you answer your question.</h6>
        <ckeditor :editor="editor" v-model="description"></ckeditor>
        <br>
        <br>
        <button class="btn btn-default submit-question" @click="submitQuestion">SUBMIT</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.question-form {
  padding-top: 150px;
}

.submit-question {
  padding: 5px 15px;
  font-size: 20px;
}

.submit-question:hover {
  background-color: #000;
  color: #fff;
}
</style>
<script>
import { mapState } from "vuex";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import baseURL from "@/api/baseURL";

export default {
  name: "question-form",
  data() {
    return {
      editor: ClassicEditor,
      name: localStorage.getItem("name"),
      title: "",
      description: ""
    };
  },
  computed: mapState(["isLogin"]),
  mounted() {
    if (!this.isLogin) {
      this.$router.push("/sign-in");
    }
  },
  methods: {
    submitQuestion() {
      baseURL
        .post(
          "/questions",
          {
            title: this.title,
            description: this.description,
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestionList");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>
