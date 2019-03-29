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
          headers: {
            token: localStorage.getItem('token')
          }
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
            headers: {
              token: localStorage.getItem('token')
            }
          })
        .then(({ data }) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `Welcome to HacktivOverflow`,
            showConfirmButton: false,
            timer: 1500
          })
          commit('setIsLogin', data);
        })
        .catch(({ response }) => {
          if (response.data == undefined) {
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: 'Wrong email/password',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              position: 'top-end',
              type: 'warning',
              title: `${response.data.message}`,
              showConfirmButton: false,
              timer: 1500
            })
          }
          console.log(response);
        });
    },
    getSingleQuestion({ commit }, payload) {
      console.log('masuk sini');
      
      baseURL
        .get(`/questions/${payload.id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data);
          
          commit("setSingleQuestion", data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getQuestionDetail({ commit }, payload) {
      Promise.all([baseURL.get(`/questions/${payload.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }),
      baseURL.get(`/answers?search=${payload.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
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
          headers: {
            token: localStorage.getItem('token')
          }
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
