<template>
  <div class="container mt-5">
    <h1>Add Book</h1>

    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn" class="form-label">ISBN</label>
        <input
          id="isbn"
          v-model.number="isbn"
          type="number"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Book Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import db from '../Firebase/init.js'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')

const addBook = async () => {
  try {
    await addDoc(collection(db, 'books'), {
      isbn: isbn.value,
      name: name.value
    })

    console.log('Book added successfully')
    isbn.value = null
    name.value = ''
  } catch (error) {
    console.error('Error adding book:', error)
  }
}
</script>