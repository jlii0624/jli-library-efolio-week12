<template>
  <main>
    <h1>WEATHER APP</h1>

    <form @submit.prevent="searchByCity">
      <input v-model="city" placeholder="Enter city, e.g. Clayton, AU" />
      <button type="submit">Search</button>
    </form>

    <p v-if="errorMessage">{{ errorMessage }}</p>

    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <img :src="iconUrl" alt="Weather Icon" />
      <p>{{ temperature }} °C</p>
      <p>{{ weatherData.weather[0].description }}</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const apikey = '7337774610d725f4df0857aa1ec9038c';
const city = ref('');
const weatherData = ref(null);
const errorMessage = ref('');

const temperature = computed(() => {
  return weatherData.value ? weatherData.value.main.temp : null;
});

const iconUrl = computed(() => {
  if (!weatherData.value) return '';
  const icon = weatherData.value.weather[0].icon;
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
});

const fetchWeatherData = async (query) => {
  errorMessage.value = '';
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          ...query,
          appid: apikey,
          units: 'metric',
        },
      },
    );
    weatherData.value = response.data;
  } catch (error) {
    weatherData.value = null;
    errorMessage.value =
      error.response?.data?.message || 'Unable to fetch weather data.';
  }
};

const searchByCity = () => {
  if (city.value.trim()) {
    fetchWeatherData({ q: city.value.trim() });
  }
};

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    errorMessage.value = 'Geolocation is not supported.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherData({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    },
    () => {
      errorMessage.value = 'Unable to get your location. Please allow location access.';
    },
    { timeout: 10000 },
  );
};

onMounted(fetchCurrentLocationWeather);
</script>
