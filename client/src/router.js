import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/AllQuestions.vue'),
    },
    {
      path: '/sign-in',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */'./views/SignInForm.vue'),
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signin" */'./views/SignUpForm.vue'),
    },
    {
      path: '/ask-question',
      name: 'askQuestion',
      component: () => import(/* webpackChunkName: "askQuestion" */'./views/QuestionForm.vue'),
    },
    {
      path: '/questions/:id',
      name: 'questionDetail',
      component: () => import(/* webpackChunkName: "questionDetail" */'./views/QuestionDetail.vue'),
    },
    {
      path: '/edit-question/:id',
      name: 'editQuestion',
      component: () => import(/* webpackChunkName: "editQuestion" */'./views/EditQuestionForm.vue'),
    },
    {
      path: '/my-questions',
      name: 'myQuestion',
      component: () => import(/* webpackChunkName: "myQuestion" */'./views/MyQuestion.vue'),
    },
    {
      path: '/my-answers',
      name: 'myAnswers',
      component: () => import(/* webpackChunkName: "myAnswers" */'./views/MyAnswers.vue'),
    },
    {
      path: '/edit-answer/:id',
      name: 'editAnswer',
      component: () => import(/* webpackChunkName: "editAnswer" */'./views/EditAnswerForm.vue'),
    },
  ],
});
