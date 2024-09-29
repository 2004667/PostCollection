<script setup>
const props = defineProps({
  post: Object
});
</script>

<template>
  <div v-if="post" class="p-4 md:w-[500px] max-[767px]:w-[80%] md:h-[350px] max-[767px]:h-[60%] bg-[#FFFFFF] rounded-md drop-shadow-lg flex flex-col justify-center">
    <p class="mt-[10px]">Identification number of the post: {{post.id}}</p>
    <h1 class="text-2xl font-bold mt-[15px]">{{ post.title }}</h1>
    <p class="mt-[30px]">{{ post.body }}</p>
    <button @click="$emit('close-details')" class="mt-[5%] bg-[#1531B0] text-white px-4 py-2 rounded w-[100px]">Back</button>
  </div>
</template>

