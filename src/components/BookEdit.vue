<template>
    <div>
      <div
        v-if="isShowModalEdit"
        class="modal"
        style="display: block"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Book</h5>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="title">Title</label>
                  <input class="form-control" type="text" v-model="book.title" />
                </div>
                <div class="form-group">
                  <label for="author">Author</label>
                  <input class="form-control" type="text" v-model="book.author" />
                </div>
                <div class="form-group">
                  <label for="year">Year</label>
                  <input class="form-control" type="number" v-model="book.year" />
                </div>
                <div class="form-group">
                  <label for="coverImage">Cover Image</label>
                  <input class="form-control" type="text" v-model="book.coverImage" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="handleCloseModalEdit"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="HandleSaveChange">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import instanceAxios from '@/ultis/configAxios'
  import { onMounted, ref } from 'vue'
  
  const props = defineProps({
    isShowModalEdit: Boolean,
    handleCloseModalEdit: Function,
    bookSelected: Number
  })
  
  const emit = defineEmits(['handleUpdateBooks'])
  const book = ref({})
  
  const HandleSaveChange = () => {
    emit('handleUpdateBooks', book.value)
  }
  const fetchBook = async () => {
    const fetchBookResponse = await instanceAxios.get(`/books/${props.bookSelected}`)
    book.value = fetchBookResponse.data
  }
  
  onMounted(() => {
    fetchBook()
  })
  </script>
  