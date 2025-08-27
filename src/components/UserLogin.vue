<template>
  <div class="login-page">
    <!-- Background Elements -->
    <div class="login-bg">
      <div class="floating-elements">
        <div 
          v-for="(element, index) in floatingElements" 
          :key="index"
          class="floating-element"
          :style="element.style">
        </div>
      </div>
    </div>

    <!-- Login Container -->
    <div class="login-container">
      <div class="login-card">
        <!-- Logo/Header -->
        <div class="login-header">
          <div class="logo">
            Ride<span class="logo-accent">Aware</span>
          </div>
          <h2 class="login-title">Welcome Back</h2>
          <p class="login-subtitle">Sign in to continue your cycling journey</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <div class="input-wrapper">
              <i class="fas fa-user input-icon"></i>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                class="form-input"
                :class="{ 'error': error && !username }"
                placeholder="Enter your username"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                class="form-input"
                :class="{ 'error': error && !password }"
                placeholder="Enter your password"
                required 
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="rememberMe" class="checkbox-input">
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">Remember me</span>
            </label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            class="login-button"
            :class="{ 'loading': isLoading }"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else class="loading-text">
              <i class="fas fa-spinner fa-spin"></i>
              Signing In...
            </span>
          </button>

          <div class="divider">
            <span>or</span>
          </div>

          <button type="button" class="social-login google">
            <i class="fab fa-google"></i>
            Continue with Google
          </button>

          <button type="button" class="social-login github">
            <i class="fab fa-github"></i>
            Continue with GitHub
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          {{ error }}
        </div>

        <!-- Sign Up Link -->
        <div class="signup-prompt">
          <p>Don't have an account? <a href="/signup" class="signup-link">Sign up</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/assets/css/components/login.css';

export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      isLoading: false,
      showPassword: false,
      rememberMe: false,
      floatingElements: []
    };
  },
  mounted() {
    this.generateFloatingElements();
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.error = 'Please fill in all fields';
        return;
      }

      this.isLoading = true;
      this.error = null;

      try {
        const response = await axios.post('http://127.0.0.1:5000/login', {
          username: this.username,
          password: this.password,
        });
        
        console.log('Login successful:', response.data);
        
        // Store user data if remember me is checked
        if (this.rememberMe) {
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          sessionStorage.setItem('user', JSON.stringify(response.data));
        }
        
        // Add success animation before redirect
        setTimeout(() => {
          this.$router.push('/logged-in');
        }, 500);
        
      } catch (error) {
        console.error('Login failed:', error.response?.data);
        this.error = error.response?.data?.error || 'Login failed. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    
    generateFloatingElements() {
      for (let i = 0; i < 12; i++) {
        this.floatingElements.push({
          style: {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 8 + 's',
            animationDuration: (6 + Math.random() * 4) + 's'
          }
        });
      }
    }
  }
};
</script>