<template>
  <div class="login">
    <h2>Login to RideAware</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/login', {
          username: this.username,
          password: this.password,
        });
        console.log('Login successful:', response.data);
        // Redirect to logged-in page on success
        this.$router.push('/logged-in');
      } catch (error) {
        console.error('Login failed:', error.response.data);
        this.error = error.response.data.error || 'An error occurred';
      }
    },
  },
};
</script>
