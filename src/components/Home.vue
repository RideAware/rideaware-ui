<template>
  <div class="homepage">
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo" @click="scrollTo('hero')">
          Ride<span class="logo-accent">Aware</span>
        </div>
        <ul class="nav-links">
          <li>
            <a href="#" @click.prevent="scrollTo('features')">Features</a>
          </li>
          <li>
            <router-link to="/login" class="login-link">Login</router-link>
          </li>
          <li>
            <router-link to="/signup" class="signup-btn">Sign Up</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <section id="hero" class="hero">
      <div class="hero-bg"></div>
      <div class="floating-elements">
        <div 
          v-for="(element, index) in floatingElements" 
          :key="index"
          class="floating-element"
          :style="element.style">
        </div>
      </div>
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">{{ heroTitle }}</h1>
          <p class="hero-subtitle">{{ heroSubtitle }}</p>
          
          <div class="cta-section">
            <h3>Coming soon!</h3>
            <p>Join us while waiting for launch</p>
            
            <div class="email-form">
              <input 
                type="email" 
                class="email-input" 
                v-model="emailInput"
                placeholder="Enter your email address" 
                required
                @keypress.enter="handleNotifyMe">
              <button class="notify-btn" @click="handleNotifyMe" :disabled="!isValidEmail">
                Notify Me
              </button>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="phone-mockup">
            <div class="screen">
              <div class="app-interface">
                <div class="app-logo">RideAware</div>
                <div class="stats-grid">
                  <div 
                    v-for="stat in mockupStats" 
                    :key="stat.id" 
                    class="stat-card"
                    :class="{ 'active': stat.id === activeStat }"
                    @mouseenter="activeStat = stat.id"
                    @mouseleave="activeStat = null">
                    <div class="stat-number">{{ stat.value }}</div>
                    <div class="stat-label">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <div class="section-header">
        <h2 class="section-title">{{ featuresTitle }}</h2>
        <p class="section-subtitle">{{ featuresSubtitle }}</p>
      </div>

      <div class="features-container">
        <div class="features-grid">
          <div 
            v-for="feature in features" 
            :key="feature.id" 
            class="feature-card"
            @mouseenter="animateCard($event)"
            @mouseleave="resetCard($event)">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <ul class="feature-list">
              <li v-for="item in feature.items" :key="item.title">
                <strong>{{ item.title }}:</strong> {{ item.description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in platformStats" :key="stat.id" class="stat-item">
            <div class="stat-number">{{ animatedStats[stat.id] || 0 }}{{ stat.suffix }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} RideAware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import '@/assets/css/components/homepage.css';

export default {
  name: 'Homepage',
  setup() {
    const heroTitle = ref("Elevate Your Cycling Journey")
    const heroSubtitle = ref("The ultimate smart training platform for cyclists who demand excellence in every ride.")
    const featuresTitle = ref("Powerful Features for Every Cyclist")
    const featuresSubtitle = ref("From beginners to professionals, RideAware provides comprehensive tools to optimize your training and performance.")
    const currentYear = ref(new Date().getFullYear())
    
    const emailInput = ref('')
    const activeStat = ref(null)

    const isValidEmail = computed(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(emailInput.value)
    })

    const mockupStats = reactive([
      { id: 'speed', value: '24.5', label: 'KM/H AVG' },
      { id: 'time', value: '45', label: 'MINUTES' },
      { id: 'calories', value: '285', label: 'CALORIES' },
      { id: 'distance', value: '18.2', label: 'DISTANCE' }
    ])

    const features = reactive([
      {
        id: 1,
        icon: "fas fa-calendar-alt",
        title: "Smart Training Plans",
        items: [
          { title: "AI-Powered Planning", description: "Customized training plans based on your goals and fitness level" },
          { title: "Adaptive Scheduling", description: "Smart workout scheduling with automated reminders" },
          { title: "Goal Tracking", description: "Set and monitor your cycling objectives in real-time" }
        ]
      },
      {
        id: 2,
        icon: "fas fa-chart-line",
        title: "Advanced Analytics",
        items: [
          { title: "Detailed Logging", description: "Track exercises, sets, reps, and performance metrics" },
          { title: "Data Visualization", description: "Interactive charts, graphs, and progress statistics" },
          { title: "Progress Insights", description: "Monitor your improvement over time with AI analysis" }
        ]
      },
      {
        id: 3,
        icon: "fas fa-bicycle",
        title: "Virtual Training",
        items: [
          { title: "Expert Coaching", description: "Professional guidance to achieve your cycling goals" },
          { title: "Immersive Rides", description: "Virtual training experiences to boost performance" },
          { title: "Structured Workouts", description: "Designed programs for fitness and performance gains" }
        ]
      },
      {
        id: 4,
        icon: "fas fa-heart",
        title: "Health & Recovery",
        items: [
          { title: "Nutrition Tracking", description: "Plan and monitor your dietary intake for optimal performance" },
          { title: "Recovery Optimization", description: "Tools and resources for effective rest and recovery" },
          { title: "Injury Prevention", description: "Proactive measures to prevent and manage injuries" }
        ]
      },
      {
        id: 5,
        icon: "fas fa-users",
        title: "Community & Social",
        items: [
          { title: "Social Sharing", description: "Share achievements and progress on social platforms" },
          { title: "Active Community", description: "Connect with fellow cyclists and share experiences" },
          { title: "Competitive Leaderboards", description: "Challenge yourself against the community" }
        ]
      },
      {
        id: 6,
        icon: "fas fa-sync-alt",
        title: "Smart Integration",
        items: [
          { title: "Wearable Sync", description: "Connect with fitness trackers and smart devices" },
          { title: "Music Integration", description: "Seamlessly sync with your favorite music services" },
          { title: "Data Portability", description: "Easy import/export to other cycling platforms" }
        ]
      }
    ])

    const platformStats = reactive([
      { id: 'users', number: 50000, suffix: '+', label: 'Active Cyclists' },
      { id: 'rides', number: 1000000, suffix: '+', label: 'Rides Tracked' },
      { id: 'distance', number: 25000000, suffix: 'km', label: 'Total Distance' },
      { id: 'rating', number: 4.8, suffix: '/5', label: 'App Rating' }
    ])

    const animatedStats = reactive({})
    const floatingElements = reactive([])

    const generateFloatingElements = () => {
      for (let i = 0; i < 15; i++) {
        floatingElements.push({
          style: {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 6 + 's',
            animationDuration: (6 + Math.random() * 4) + 's'
          }
        })
      }
    }

    const animateStats = () => {
      platformStats.forEach(stat => {
        let current = 0
        const increment = stat.number / 100
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.number) {
            animatedStats[stat.id] = stat.number
            clearInterval(timer)
          } else {
            animatedStats[stat.id] = Math.floor(current)
          }
        }, 20)
      })
    }

    const scrollTo = (elementId) => {
      const element = document.getElementById(elementId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const goToNewsletters = () => {
      window.location.href = '/newsletters'
    }

    const handleNotifyMe = () => {
      if (isValidEmail.value) {
        alert(`Thanks! We'll notify you at ${emailInput.value} when RideAware launches.`)
        emailInput.value = ''
      } else {
        alert('Please enter a valid email address.')
      }
    }

    const animateCard = (event) => {
      const card = event.currentTarget
      card.style.transform = 'translateY(-10px) rotateX(2deg)'
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }

    const resetCard = (event) => {
      const card = event.currentTarget
      card.style.transform = 'translateY(0) rotateX(0)'
    }

    onMounted(() => {
      generateFloatingElements()
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateStats()
            observer.unobserve(entry.target)
          }
        })
      })

      const statsSection = document.querySelector('.stats')
      if (statsSection) {
        observer.observe(statsSection)
      }

      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset
        const parallax = document.querySelector('.hero-bg')
        if (parallax) {
          const speed = scrolled * 0.3
          parallax.style.transform = `translateY(${speed}px)`
        }
      })

      let statIndex = 0
      setInterval(() => {
        activeStat.value = mockupStats[statIndex].id
        statIndex = (statIndex + 1) % mockupStats.length
        setTimeout(() => {
          activeStat.value = null
        }, 1000)
      }, 3000)
    })

    return {
      heroTitle,
      heroSubtitle,
      featuresTitle,
      featuresSubtitle,
      currentYear,
      emailInput,
      isValidEmail,
      activeStat,
      mockupStats,
      features,
      platformStats,
      animatedStats,
      floatingElements,
      scrollTo,
      goToNewsletters,
      handleNotifyMe,
      animateCard,
      resetCard
    }
  }
}
</script>