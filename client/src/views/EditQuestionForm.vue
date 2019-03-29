<template>
  <div class="container question-detail">
    <h4>Title</h4>
    <input type="text" class="form-control" v-model="singleQuestion.title">
    <br>
    <h4>Description</h4>
    <ckeditor :editor="editor" v-model="singleQuestion.description"></ckeditor>
    <br>
    <br>
    <button @click="editQuestion(singleQuestion._id)" class="btn btn-default update-btn">UPDATE</button>
  </div>
</template>
<style scoped>
.question-detail {
  padding: 100px 200px;
}

.update-btn {
  padding: 5px 15px;
  font-size: 20px;
  color: #000;
}

.update-btn:hover {
  background-color: #000;
  color: #fff;
}
</style>
<script>
import { mapState } from "vuex";
import baseURL from "@/api/baseURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "edit-question",
  computed: mapState(["singleQuestion"]),
  data() {
    return {
      editor: ClassicEditor
    };
  },
  created() {
    this.$store.dispatch("getSingleQuestion", { id: this.$route.params.id });
  },
  methods: {
    editQuestion(id) {
      baseURL
        .put(
          `questions/${id}`,
          {
            title: this.singleQuestion.title,
            description: this.singleQuestion.description
          },
          {
            headers: {
              token: localStorage.getItem("token"),
              authorized: localStorage.getItem('userId'),
              questionId: id
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestionList");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>
