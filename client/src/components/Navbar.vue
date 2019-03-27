<template>
  <div class="container col-sm-12" id="navbar">
    <div class="row">
      <div @click="backToHome" class="col-sm-4 d-flex justify-content-start">
        <h2 class="title">HacktivOverflow</h2>
      </div>
      <div class="col-sm-3 d-flex justify-content-center">
        <div class="input-group mb-2">
          <input type="text" class="form-control" placeholder="Search...">
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-5 d-flex justify-content-end">
        <router-link to="/sign-in">
          <button v-if="!isLogin" class="btn btn-default ask-question">SIGN IN</button>
        </router-link>&nbsp;&nbsp;
        &nbsp;&nbsp;
        <button
          v-if="isLogin"
          class="btn btn-default ask-question"
          @click="signOut"
        >SIGN OUT</button>
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        <router-link to="/ask-question">
          <button class="btn btn-default ask-question">ASK QUESTION</button>
        </router-link>&nbsp;&nbsp;
        &nbsp;&nbsp;
        <router-link to="/my-answers">
          <button v-if="isLogin" class="btn btn-default ask-question">MY ANSWERS</button>
        </router-link>&nbsp;&nbsp;
        &nbsp;&nbsp;
        <router-link to="/my-questions">
          <button v-if="isLogin" class="btn btn-default ask-question">MY QUESTIONS</button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
body {
  font-family: "Lato", sans-serif;
}

.title {
  font-family: 'Cinzel', serif;
}

#navbar {
  background-color: #faf6ed;
  padding: 30px;
}

.ask-question {
  font-size: 20px;
  padding: 5px 15px;
  color: #000;
}

.ask-question:hover {
  background: #000;
  color: #fff;
}
</style>
<script>
import { mapState } from "vuex";

export default {
  name: "navbar",
  computed: mapState(["isLogin"]),
  methods: {
    signOut() {
      this.$store.commit("setSignOut");
      this.$store.dispatch("getQuestionList");
    },
    backToHome() {
      this.$store.dispatch("getQuestionList");
    }
  }
};
</script>
