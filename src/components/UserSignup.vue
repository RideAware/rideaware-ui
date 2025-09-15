<template>
  <div class="signup-page">
    <div class="signup-bg">
      <div class="floating-elements">
        <div 
          v-for="(element, index) in floatingElements" 
          :key="index"
          class="floating-element"
          :style="element.style">
        </div>
      </div>
    </div>

    <div class="signup-container">
      <div class="signup-card">
        <div class="signup-header">
          <div class="logo">
            Ride<span class="logo-accent">Aware</span>
          </div>
          <h2 class="signup-title">Join RideAware</h2>
          <p class="signup-subtitle">Create your account to start tracking your cycling journey</p>
        </div>

        <form @submit.prevent="signup" class="signup-form">
          <div class="form-row">
            <div class="form-group half-width">
              <label for="firstName" class="form-label">First Name</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="firstName" 
                  class="form-input"
                  :class="{ 'error': error && !firstName }"
                  placeholder="First name"
                  required 
                />
              </div>
            </div>

            <div class="form-group half-width">
              <label for="lastName" class="form-label">Last Name</label>
              <div class="input-wrapper">
                <i class="fas fa-user input-icon"></i>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="lastName" 
                  class="form-input"
                  :class="{ 'error': error && !lastName }"
                  placeholder="Last name"
                  required 
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <div class="input-wrapper">
              <i class="fas fa-at input-icon"></i>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                class="form-input"
                :class="{ 'error': error && !username }"
                placeholder="Choose a username"
                required 
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <div class="input-wrapper">
              <i class="fas fa-envelope input-icon"></i>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="form-input"
                :class="{ 'error': error && !email }"
                placeholder="Enter your email"
                required 
                autocomplete="email"
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
                placeholder="Create a password"
                required 
                autocomplete="new-password"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div class="password-strength" v-if="password">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="passwordStrength.class"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
              <span class="strength-text" :class="passwordStrength.class">
                {{ passwordStrength.text }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <div class="input-wrapper">
              <i class="fas fa-lock input-icon"></i>
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                id="confirmPassword" 
                v-model="confirmPassword" 
                class="form-input"
                :class="{ 'error': error && !confirmPassword || passwordMismatch }"
                placeholder="Confirm your password"
                required 
                autocomplete="new-password"
              />
              <button 
                type="button" 
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
            <div v-if="passwordMismatch" class="password-mismatch">
              <i class="fas fa-exclamation-triangle"></i>
              Passwords do not match
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="agreeToTerms" class="checkbox-input" required>
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">
                I agree to the <a href="/terms" class="link">Terms of Service</a> 
                and <a href="/privacy" class="link">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input type="checkbox" v-model="subscribeNewsletter" class="checkbox-input">
              <span class="checkbox-custom"></span>
              <span class="checkbox-label">
                Subscribe to newsletter for cycling tips and updates
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            class="signup-button"
            :class="{ 'loading': isLoading }"
            :disabled="isLoading || !isFormValid"
          >
            <span v-if="!isLoading">Create Account</span>
            <span v-else class="loading-text">
              <i class="fas fa-spinner fa-spin"></i>
              Creating Account...
            </span>
          </button>

          <div class="divider">
            <span>or</span>
          </div>

          <button type="button" class="social-signup google">
            <i class="fab fa-google"></i>
            Sign up with Google
          </button>

          <button type="button" class="social-signup github">
            <i class="fab fa-github"></i>
            Sign up with GitHub
          </button>
        </form>

        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          {{ error }}
        </div>

        <div v-if="successMessage" class="success-message">
          <i class="fas fa-check-circle"></i>
          {{ successMessage }}
        </div>

        <div class="login-prompt">
          <p>Already have an account? <router-link to="/login" class="login-link">Sign In</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/assets/css/components/signup.css';

export default {
  name: 'UserSignup',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      successMessage: null,
      isLoading: false,
      showPassword: false,
      showConfirmPassword: false,
      agreeToTerms: false,
      subscribeNewsletter: false,
      floatingElements: []
    };
  },
  computed: {
    passwordMismatch() {
      return this.confirmPassword && this.password !== this.confirmPassword;
    },
    passwordStrength() {
      if (!this.password) return { width: '0%', class: '', text: '' };
      
      let score = 0;
      let feedback = [];
      
      if (this.password.length >= 8) score += 1;
      else feedback.push('at least 8 characters');
      
      if (/[A-Z]/.test(this.password)) score += 1;
      else feedback.push('uppercase letter');
      
      if (/[a-z]/.test(this.password)) score += 1;
      else feedback.push('lowercase letter');

      if (/\d/.test(this.password)) score += 1;
      else feedback.push('number');
      
      if (/[!@#$%^&*(),.?":{}|<>]/.test(this.password)) score += 1;
      else feedback.push('special character');
      
      if (score < 2) {
        return { width: '25%', class: 'weak', text: 'Weak' };
      } else if (score < 4) {
        return { width: '50%', class: 'fair', text: 'Fair' };
      } else if (score < 5) {
        return { width: '75%', class: 'good', text: 'Good' };
      } else {
        return { width: '100%', class: 'strong', text: 'Strong' };
      }
    },
    isFormValid() {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      return this.firstName && 
             this.lastName && 
             this.username && 
             this.email && 
             this.password && 
             this.confirmPassword && 
             !this.passwordMismatch && 
             this.agreeToTerms;
    }
  },
  mounted() {
    this.generateFloatingElements();
  },
  methods: {
    async signup() {
      if (!this.isFormValid) {
        this.error = 'Please fill in all required fields correctly';
        return;
      }

      this.isLoading = true;
      this.error = null;
      this.successMessage = null;

      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password,
          subscribeNewsletter: this.subscribeNewsletter
        });
        
        console.log('Signup successful:', response.data);
        
        this.successMessage = 'Account created successfully! Please check your email to verify your account.';
        
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        
      } catch (error) {
        console.error('Signup failed:', error.response?.data);
        this.error = error.response?.data?.error || 'Account creation failed. Please try again.';
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