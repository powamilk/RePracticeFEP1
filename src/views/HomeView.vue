<template>
  <main>
    <RouterLink to="/create" class="btn btn-primary">Create Book</RouterLink>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Cover Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td>
            <img :src="book.coverImage" alt="Book Cover" />
          </td>
          <td>
            <RouterLink :to="{ name: 'book-detail', params: { id: book.id } }" class="btn btn-primary">Detail</RouterLink>
            <button class="btn btn-danger" @click="handleDelete(book.id)">Delete</button>
            <button class="btn btn-warning" @click="handleToggleModal(book.id)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
    <BookEdit
      v-if="isShowModalEdit"
      :isShowModalEdit="isShowModalEdit"
      :handleCloseModalEdit="handleCloseModalEdit"
      :bookSelected="bookSelected"
      @handleUpdateBooks="handleUpdateBooks"
    />
  </main>
</template>

<script setup>
import BookEdit from '@/components/BookEdit.vue'  
import instanceAxios from '@/ultis/configAxios'
import { onMounted, ref } from 'vue'

const books = ref()
const isShowModalEdit = ref(false)
const bookSelected = ref()

const handleToggleModal = async (bookId) => {
  bookSelected.value = await bookId
  isShowModalEdit.value = true
}

const handleCloseModalEdit = () => {
  isShowModalEdit.value = false
}

const handleUpdateBooks = async (book) => {
  try {
    const handleUpdateResponse = await instanceAxios.put(`/books/${book.id}`, book)
    console.log('Update response:', handleUpdateResponse.data) 
    const index = books.value.findIndex((item) => item.id === book.id)
    books.value[index] = book
    handleCloseModalEdit()
  } catch (error) {
    console.error('Failed to update book:', error)
  }
}

const handleDelete = async (bookId) => {
  const isConfirm = window.confirm('Are you sure?')
  if (!isConfirm) return
  try {
    const handleDeleteResponse = await instanceAxios.delete(`/books/${bookId}`)
    console.log('Delete response:', handleDeleteResponse.data)  
    books.value = books.value.filter((book) => book.id !== bookId)
  } catch (error) {
    console.error('Failed to delete book:', error)
  }
}

const fetchBooks = async () => {
  const fetchBooksResponse = await instanceAxios.get('/books')
  books.value = fetchBooksResponse.data
}

onMounted(() => {
  fetchBooks()
})
</script>
