<template>
  <div class="container sign-up-form">
    <form class="col-sm-12" @submit.prevent="signUp">
      <div class="row">
        <div class="col">
          <label for="inputFirstName">First Name</label>
          <input v-model="first_name" type="text" class="form-control" placeholder="First name">
        </div>&nbsp;
        &nbsp;
        <div class="col">
          <label for="inputLastName">Last Name</label>
          <input v-model="last_name" type="text" class="form-control" placeholder="Last name">
        </div>
      </div>
      <div class="form-group">
        <label for="inputEmail">Email</label>
        <input v-model="email" type="email" class="form-control" placeholder="Email">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <br>
      <button type="submit" class="btn btn-sign-up">SIGN UP</button>
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

.btn-sign-up {
  font-size: 20px;
  color: #000;
}

.btn-sign-up:hover {
  background-color: #000;
  color: #fff;
}

.sign-up-form {
  padding: 180px;
  font-size: 20px;
}
</style>

<script>
import baseURL from "@/api/baseURL";

export default {
  name: "signup",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      baseURL
        .post(
          "/users/signup",
          {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password
          },
          {
            headers: localStorage.getItem("token")
          }
        )
        .then(({ data }) => {
          this.$router.push("/sign-in");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>
