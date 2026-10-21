<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} (ISBN: {{ book.isbn }})
        <button type="button" @click="updateBook(book)">Update</button>
        <button type="button" @click="deleteBook(book)">Delete</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import db from '../Firebase/init.js';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
const books = ref([]);

const fetchBooks = async () => {
  try {
const q = query(
  collection(db, 'books'),
  where('isbn', '>', 1000),
  orderBy('isbn', 'asc'),
  limit(3)
);
    const querySnapshot = await getDocs(q);
    const booksArray = [];

    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() });
    });

    books.value = booksArray;
  } catch (error) {
    console.error('Error fetching books: ', error);
  }
};

const updateBook = async (book) => {
  const newName = window.prompt('Enter a new book name:', book.name)

  if (!newName) return

  try {
    await updateDoc(doc(db, 'books', book.id), {
      name: newName
    })

    await fetchBooks()
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}
const deleteBook = async (book) => {
  try {
    await deleteDoc(doc(db, 'books', book.id))
    await fetchBooks()
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}
onMounted(() => {
  fetchBooks();
});
</script>