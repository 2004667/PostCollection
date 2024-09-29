<template>
  <div class="flex  justify-center md:mt-[35%] max-[767px]:mt-[85%]">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 py-[3px] border border-gray-300 rounded-md mr-2 hover:animate-pulse
      hover:bg-[#1531B0] hover:text-[white] h-[30px]"
    >
      Previous
    </button>
    <span class="mx-2">Page {{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 py-[3px] border border-gray-300 rounded-md ml-2 hover:animate-pulse
      hover:bg-[#1531B0] hover:text-[white] h-[30px]"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
const props = defineProps({
  totalPosts: Number,
  postsPerPage: {
    type: Number,
    default: 12,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(['update:currentPage']);
const totalPages = computed(() => Math.ceil(props.totalPosts / props.postsPerPage));
const goToPage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
};
</script>

