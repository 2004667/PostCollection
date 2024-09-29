<script setup>
import { ref, onMounted, computed } from 'vue';
import PostCard from './PostCard.vue';
import PostDetails from './PostDetails.vue';
import Pagination from './Pagination.vue';

const posts = ref([]);
const selectedPost = ref(null);
const menuVisible = ref(false);
const currentPage = ref(1);
const postsPerPage = 12; 

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100');
  if (!res.ok) {
    console.error('Failed to fetch posts:', res.statusText);
    return;
  }
  posts.value = await res.json();
};

const openPostDetails = (post) => {
  selectedPost.value = post;
};
const closePostDetails = () => {
  selectedPost.value = null;
};
const toggleMenu = () => {
  menuVisible.value = !menuVisible.value; 
};
const navigateTo = (page) => {
  console.log(`Navigating to: ${page}`);
  menuVisible.value = false; 
};
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return posts.value.slice(start, start + postsPerPage);
});
const totalPosts = computed(() => posts.value.length);

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <header class="w-[94%] ml-[3%] h-[80px] bg-[#1531B0] text-[#FFFFFF] flex rounded-md drop-shadow-lg items-center justify-between">
    <div class="flex items-center ml-[5%] space-x-[3%]">
      <img src="/post.png" alt="Post Icon" width="40px" class="md:w-[40px] max-[767px]:w-[30px]" />
      <h1 class="md:text-[25px] max-[767px]:text-[20px] font-[600]">PostCollection</h1>
    </div>
    <div class="text-[16px] flex md:space-x-[15%] max-[950px]:hidden">
      <h1>Home</h1>
      <h1>About</h1>
      <h1>Favorites</h1>
      <h1>Login</h1>
      <h1>Registration</h1>
    </div>
    <div class="flex justify-end">
      <img
        src="/menu.png"
        alt="Menu"
        width="50px"
        class="w-[40px] h-[40px] mr-[20px] cursor-pointer min-[950px]:hidden"
        @click="toggleMenu"
      />
    </div>
  </header>
  <div v-if="menuVisible" class="absolute top-[80px] ml-[3%] bg-white shadow-lg rounded-md p-4 w-[94%] text-[20px] flex flex-col items-center">
    <h1 class="text-black cursor-pointer" >Home</h1>
    <h1 class="text-black cursor-pointer" >About</h1>
    <h1 class="text-black cursor-pointer" >Favorites</h1>
    <h1 class="text-black cursor-pointer" >Login</h1>
    <h1 class="text-black cursor-pointer" >Registration</h1>
  </div>
  <main class="p-4 flex flex-col justify-center items-center">
    <div class="w-[90%] grid grid-cols-1 md:gap-[3%] max-[767px]:gap-[1%] sm:grid-cols-2 lg:grid-cols-3">
      <PostCard v-for="post in paginatedPosts" :key="post.id" :post="post" @view-details="openPostDetails(post)" />
    </div>
    <div v-if="selectedPost" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <PostDetails :post="selectedPost" @close-details="closePostDetails" />
    </div>
    <div class="">
      <Pagination
      :total-posts="totalPosts"
      :posts-per-page="postsPerPage"
      v-model:current-page="currentPage" 
    />
    </div>
  </main>
</template>
