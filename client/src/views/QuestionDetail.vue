<template>
  <div class="container col-sm-12 question-detail">
    <div class="row">
      <div v-if="singleQuestion._id" class="col-sm-1 d-flex justify-content-center">
        <i
          @click="questionUpVote(singleQuestion._id)"
          class="far fa-arrow-alt-circle-up fa-2x"
          v-if="isLogin"
        ></i>
        &nbsp;
        &nbsp;
        <h5
          v-if="singleQuestion.upvotes"
        >{{singleQuestion.upvotes.length - singleQuestion.downvotes.length}}</h5>&nbsp;
        &nbsp;
        <i
          @click="questionDownVote(singleQuestion._id)"
          class="far fa-arrow-alt-circle-down fa-2x"
          v-if="isLogin"
        ></i>
      </div>
      <div class="col-sm-11">
        <h2>{{singleQuestion.title}}</h2>
        <hr>
        <div v-html="singleQuestion.description" class="description"></div>
        <br>
        <div v-if="singleQuestion._id">
          <button
            @click="showEditForm(singleQuestion._id)"
            v-if="singleQuestion.userId._id == currentUser && isLogin == true"
            class="btn btn-default edit-question"
          >Edit Question</button>
        </div>
        <br>
        <br>
        <div v-if="singleQuestion._id">
          <button
            @click="deleteQuestion(singleQuestion._id)"
            v-if="singleQuestion.userId._id == currentUser && isLogin == true"
            class="btn btn-default edit-question"
          >Delete Question</button>
        </div>

        <br>
        <br>
        <h4>{{answers.length}} answer(s)</h4>
        <hr>
      </div>

      <div v-if="answers.length !== 0" class="container col-sm-12">
        <div class="row" v-for="(answer, index) in answers" :key="index">
          <div class="col-sm-1 d-flex justify-content-center">
            <i
              @click="answerUpVote(answer._id)"
              class="far fa-arrow-alt-circle-up fa-2x"
              v-if="isLogin"
            ></i>
            &nbsp;
            &nbsp;
            <h5>{{answer.upvotes.length - answer.downvotes.length}}</h5>&nbsp;
            &nbsp;
            <i
              @click="answerDownVote(answer._id)"
              class="far fa-arrow-alt-circle-down fa-2x"
              v-if="isLogin"
            ></i>
          </div>
          <div class="col-sm-11">
            <div class="card">
              <h5 class="card-header">{{answer.title}}</h5>
              <div v-html="answer.description" class="card-body answers-list"></div>
              <div class="card-footer d-flex justify-content-around">
                <h6>answered by: {{answer.userId.first_name}} {{answer.userId.last_name}}</h6>
                <button
                  @click="showAnswerEditForm(answer._id)"
                  v-if="answer.userId._id == currentUser && isLogin == true"
                  class="btn btn-default"
                >Edit Answer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="singleQuestion.userId">
      <div class="your-answer" v-if="singleQuestion.userId._id !== currentUser && isLogin == true">
        <h3>Your answer</h3>
        <input
          type="text"
          class="form-control"
          v-model="answerTitle"
          placeholder="Your Answer Title.."
        >
        <br>
        <ckeditor :editor="editor" v-model="answerDescription"></ckeditor>
        <br>
        <br>
        <button @click="addAnswer(singleQuestion._id)" class="btn btn-default add-answer">SUBMIT</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.question-detail {
  padding: 100px 200px;
}
.card {
  margin-bottom: 10px;
}

.card-footer {
  background-color: #faf6ed;
}

.answers-list {
  font-size: 18px;
}

.description {
  font-size: 20px;
}

.your-answer {
  padding-top: 100px;
}

.edit-question {
  font-size: 18px;
  background-color: #faf6ed;
  padding: 5px 15px;
}

.add-answer {
  font-size: 20px;
  padding: 10px 20px;
}

.add-answer:hover {
  background-color: #000;
  color: #fff;
}
</style>
<script>
import { mapState } from "vuex";
import baseURL from "@/api/baseURL";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Promise } from "q";

export default {
  name: "question-detail",
  computed: mapState(["answers", "singleQuestion", "isLogin"]),
  created() {
    this.$store.dispatch("getQuestionDetail", { id: this.$route.params.id });
  },
  data() {
    return {
      editor: ClassicEditor,
      currentUser: localStorage.getItem("userId"),
      answerDescription: "",
      answerTitle: ""
    };
  },
  methods: {
    questionUpVote(id) {
      baseURL
        .put(
          `/questions/upvote/${id}`,
          {
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestionDetail", {
            id: this.$route.params.id
          });
        })
        .catch(({ response }) => {
          Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: `${response.data}`,
              showConfirmButton: false,
              timer: 1500
            })
          console.log(response);
        });
    },
    questionDownVote(id) {
      baseURL
        .put(
          `/questions/downvote/${id}`,
          {
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestionDetail", {
            id: this.$route.params.id
          });
        })
        .catch(({ response }) => {
          Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: `${response.data}`,
              showConfirmButton: false,
              timer: 1500
            })
          console.log(response);
        });
    },
    answerUpVote(id) {
      baseURL
        .put(
          `/answers/upvote/${id}`,
          {
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestionDetail", {
            id: this.$route.params.id
          });
        })
        .catch(({ response }) => {
          Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: `${response.data}`,
              showConfirmButton: false,
              timer: 1500
            })
          console.log(response);
        });
    },
    answerDownVote(id) {
      baseURL
        .put(
          `/answers/downvote/${id}`,
          {
            userId: localStorage.getItem("userId")
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("getQuestionDetail", {
            id: this.$route.params.id
          });
        })
        .catch(({ response }) => {
          Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: `${response.data}`,
              showConfirmButton: false,
              timer: 1500
            })
          console.log(response);
        });
    },
    showEditForm(id) {
      this.$router.push(`/edit-question/${id}`);
    },
    deleteQuestion(id) {
      baseURL
        .delete(`/questions/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
            authorized: localStorage.getItem("userId"),
            questionId: id
          }
        })
        .then(({ data }) => {
          this.$store.dispatch("getQuestionList");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    addAnswer(questionId) {
      baseURL
        .post(
          `/answers`,
          {
            title: this.answerTitle,
            description: this.answerDescription,
            userId: localStorage.getItem("userId"),
            questionId
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.answerDescription = "";
          this.answerTitle = "";
          this.$store.dispatch("getQuestionDetail", {
            id: this.$route.params.id
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    showAnswerEditForm(id){
      this.$router.push(`/edit-answer/${id}`);
    }
  }
};
</script>
