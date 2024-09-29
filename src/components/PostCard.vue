<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  post: Object
});
const emit = defineEmits();
const openPostDetails = () => {
  emit('view-details', props.post); 
};
</script>
<template>
  <div class="border border-gray-300 p-4 rounded-md shadow-md cursor-pointer" @click="openPostDetails">
    <h2 class="text-lg font-bold">{{ post.title }}</h2>
    <p class="text-gray-600">{{ post.body.substring(0, 60) }}...</p>
  </div>
</template>


