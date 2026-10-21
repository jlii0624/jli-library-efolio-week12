<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const jsondata = ref(null);

const getAllBooksAPI = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-3f2b1.cloudfunctions.net/getAllBooks'
    );

    jsondata.value = response.data;
  } catch (error) {
    console.error('Error fetching all books:', error);
  }
};

onMounted(getAllBooksAPI);
</script>
