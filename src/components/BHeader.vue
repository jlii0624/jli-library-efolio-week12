<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            active-class="active"
            aria-current="page"
          >
            Home (Week 5)
          </router-link>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </router-link>
        </li>

        <li v-if="!isAuthenticated" class="nav-item">
          <router-link
            to="/login"
            class="nav-link"
            active-class="active"
          >
            Login
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/FireLogin"
            class="nav-link"
            active-class="active"
          >
            Firebase Login
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/FireRegister"
            class="nav-link"
            active-class="active"
          >
            FireRegister
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/addbook"
            class="nav-link"
            active-class="active"
          >
            Add Book
          </router-link>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <button
            type="button"
            class="nav-link"
            @click="logout"
          >
            Logout
          </button>
        </li>

        <li class="nav-item">
          <router-link
            to="/getbookcount"
            class="nav-link"
            active-class="active"
          >
            Get Book Count
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/WeatherCheck"
            class="nav-link"
            active-class="active"
          >
            Get Weather
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/CountBookAPI"
            class="nav-link"
            active-class="active"
          >
            CountBookAPI
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/GetAllBookAPI"
            class="nav-link"
            active-class="active"
          >
            GetAllBookAPI
          </router-link>
        </li>
      </ul>
    </header>

    <p v-if="isAuthenticated" class="text-center">
      Current role: {{ userRole }}
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { isAuthenticated, userRole } from '../auth'

const router = useRouter()

const logout = () => {
  const auth = getAuth()

  signOut(auth)
    .then(() => {
      isAuthenticated.value = false
      userRole.value = ''
      console.log('Firebase Sign out Successful!')
      console.log(auth.currentUser)
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
