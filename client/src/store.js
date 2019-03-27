import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import baseURL from '@/api/baseURL';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questionList: [],
    answers: [],
    myQuestions: [],
    myAnswers: [],
    singleAnswer: {},
    singleQuestion: {}
  },
  mutations: {
    setQuestionList(state, payload) {
      state.questionList = payload;
      router.push('/')
    },
    setIsLogin(state, payload) {
      state.isLogin = true;
      localStorage.setItem('userId', payload.userId);
      localStorage.setItem('name', payload.name);
      localStorage.setItem('token', payload.token);
      router.push('/');
    },
    setSingleQuestion(state, payload) {
      state.singleQuestion = payload
    },
    setAnswers(state, payload) {
      state.answers = payload
    },
    setSingleAnswer(state, payload) {
      state.singleAnswer = payload
    },
    setSignOut(state) {
      state.isLogin = false
      localStorage.clear()
    },
    setMyAnswers(state, payload) {
      state.myAnswers = payload
    },
    setMyQuestions(state, payload) {
      state.myQuestions = payload
    },
  },
  actions: {
    getQuestionList({ commit }) {
      baseURL
        .get('/questions', {
          headers: localStorage.getItem('token')
        })
        .then(({ data }) => {
          commit('setQuestionList', data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getSignIn({ commit }, payload) {
      baseURL
        .post('/users/signin', {
          email: payload.email,
          password: payload.password,
        }, {
            headers: localStorage.getItem('token')
          })
        .then(({ data }) => {
          commit('setIsLogin', data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getSingleQuestion({ commit }, payload) {
      baseURL
        .get(`/questions/${payload.id}`, {
          headers: localStorage.getItem('token')
        })
        .then(({ data }) => {
          commit("setSingleQuestion", data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getQuestionDetail({ commit }, payload) {
      Promise.all([baseURL.get(`/questions/${payload.id}`, {
        headers: localStorage.getItem('token')
      }),
      baseURL.get(`/answers?search=${payload.id}`, {
        headers: localStorage.getItem('token')
      })
      ])
        .then(response => {
          commit('setSingleQuestion', response[0].data)
          commit('setAnswers', response[1].data)
        })
        .catch(({ response }) => {
          console.log(response);

        })
    },
    getSingleAnswer({ commit }, payload) {
      baseURL
        .get(`answers/${payload.id}`, {
          headers: localStorage.getItem('token')
        })
        .then(({ data }) => {
          commit('setSingleAnswer', data)
        })
        .catch(({ response }) => {
          console.log(response);

        })
    }
  },
});
