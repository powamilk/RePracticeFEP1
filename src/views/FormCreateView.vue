<template>
    <div>
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input class="form-control" type="text" v-model="book.title" />
          <div v-if="isSubmit && !book.title" class="text-danger">Title is required</div>
        </div>
        <div class="form-group">
          <label for="author">Author</label>
          <input class="form-control" type="text" v-model="book.author" />
          <div v-if="isSubmit && !book.author" class="text-danger">Author is required</div>
        </div>
        <div class="form-group">
          <label for="year">Year</label>
          <input class="form-control" type="number" v-model="book.year" />
          <div v-if="isSubmit && !book.year" class="text-danger">Year is required</div>
        </div>
        <div class="form-group">
          <label for="coverImage">Cover Image</label>
          <input class="form-control" type="text" v-model="book.coverImage" />
          <div v-if="isSubmit && !book.coverImage" class="text-danger">Cover image is required</div>
        </div>
        <button class="btn btn-primary" @click.prevent="handleSubmit">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import router from '@/router'
  import instanceAxios from '@/ultis/configAxios'
  import { reactive, ref } from 'vue'
  
  const book = reactive({
    title: '',
    author: '',
    year: '',
    coverImage: ''
  })
  const isSubmit = ref(false)
  
  const checkValidate = () => {
    if (!book.title || !book.author || !book.year || !book.coverImage) {
      return false
    }
    return true
  }
  
  const handleSubmit = async () => {
  isSubmit.value = true
  if (!checkValidate()) return
  try {
    const createBookResponse = await instanceAxios.post('/books', book)
    console.log('Book created successfully:', createBookResponse.data)
    router.push({ path: '/' })
  } catch (error) {
    console.error('Failed to create book:', error)
  }
}

  </script>
  