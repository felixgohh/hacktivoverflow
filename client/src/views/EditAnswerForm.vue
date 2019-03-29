<template>
  <div class="container question-detail">
    <h4>Title</h4>
    <input type="text" class="form-control" v-model="singleAnswer.title">
    <br>
    <h4>Description</h4>
    <ckeditor :editor="editor" v-model="singleAnswer.description"></ckeditor>
    <br>
    <br>
    <button @click="editAnswer(singleAnswer._id)" class="btn btn-default update-btn">UPDATE</button>
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
  name: "edit-answer",
  computed: mapState(["singleAnswer"]),
  data() {
    return {
      editor: ClassicEditor
    };
  },
  created() {
    this.$store.dispatch("getSingleAnswer", { id: this.$route.params.id });
  },
  methods: {
    editAnswer(id) {
      baseURL
        .put(
          `answers/${id}`,
          {
            title: this.singleAnswer.title,
            description: this.singleAnswer.description
          },
          {
            headers: {
              token: localStorage.getItem("token"),
              authorized: localStorage.getItem('userId'),
              answerId: id,
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
