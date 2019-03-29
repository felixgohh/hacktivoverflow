<template>
  <div>
    <navbar/>
    <router-view/>
  </div>
</template>

<style>
</style>
<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: { Navbar },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.state.isLogin = true;
    }
    this.$store.dispatch("getQuestionList");
  }
};
</script>
