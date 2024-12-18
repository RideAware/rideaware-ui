<template>
  <Login />
  <LoggedinPage />
</template>

<script>
import Login from './components/UserLogin.vue';
import LoggedinPage from './components/LoggedinPage.vue';

export default {
  name: 'App',
  components: {
    Login,
    LoggedinPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
