<template>
  <div class="container sign-in-form">
    <form class="col-sm-12" @submit.prevent="signIn">
      <div class="form-group">
        <label for="inputEmail4">Email</label>
        <input v-model="email" type="email" class="form-control" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="inputEmail4">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <br>
      <button type="submit" class="btn btn-sign-in">SIGN IN</button>
      <br>
      <div class="sign-up d-flex justify-content-around">
        <p style="padding-top:5.5px">OR</p>
        <router-link to="/sign-up">
          <button type="button" class="btn btn-sign-in">SIGN UP</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
form {
  background-color: #faf6ed;
  padding: 40px;
  border-radius: 20px;
}

label {
  color: #000;
}
.btn-sign-in {
  font-size: 20px;
  color: #000;
}

.btn-sign-in:hover {
  background-color: #000;
  color: #fff;
}

.sign-in-form {
  padding: 180px;
  font-size: 20px;
}

.sign-up {
  padding-left: 500px;
}
</style>

<script>
export default {
  name: 'signin',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('getSignIn', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
