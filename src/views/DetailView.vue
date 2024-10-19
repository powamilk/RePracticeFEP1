<template>
    <div v-if="book">
      <div>
        <p>{{ book.title }}</p>
      </div>
      <div>
        <p>{{ book.author }}</p>
      </div>
      <div>
        <p>{{ book.year }}</p>
      </div>
      <div>
       <img :src="book.coverImage" alt="Book Cover" />
      </div>
    </div>
  </template>
  
  <script setup>
  import instanceAxios from '@/ultis/configAxios'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const id = route.params.id
  const book = ref({})
  
  const fetchBook = async () => {
    const fetchBookResponse = await instanceAxios.get(`/books/${id}`)
    book.value = fetchBookResponse.data
  }
  
  onMounted(() => {
    fetchBook()
  })
  </script>
  