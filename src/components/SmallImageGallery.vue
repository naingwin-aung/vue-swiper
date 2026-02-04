<script setup>
import { ref, computed } from "vue";
import PrimeVueGalleryModal from "./PrimeVueGalleryModal.vue";
import GalleryModal from "./GalleryModal.vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const isGalleryOpen = ref(false);
const initialSlide = ref(0);

const openGallery = (index = 0, e) => {
  e.stopPropagation();
  initialSlide.value = index;
  isGalleryOpen.value = true;
};

const imageClass = computed(() => {
  if (props.images.length === 1) return "grid-cols-1 col-span-2";
  if (props.images.length === 2) return "grid-rows-2";
  return "grid-cols-2 grid-rows-2";
});

</script>

<template>
  <div class="w-full h-full">
    <div
      :class="`grid ${imageClass} gap-1 w-full h-full rounded-lg overflow-hidden relative`"
    >
      <div
        v-for="(img, index) in images.slice(0, 3)"
        :key="index"
        @click="openGallery(index, $event)"
        :class="`w-full h-full bg-cover bg-center ${
          index === 0 && images.length >= 3 ? 'col-span-2' : 'col-span-1'
        }`"
        :style="{ backgroundImage: `url(${img.url})` }"
      >
      </div>
      <div v-if="images.length > 3" class="absolute bottom-2 right-2 bg-black/45 rounded">
        <span class="text-white text-xs p-1 py-2">more</span>
      </div>
    </div>

    <!-- <PrimeVueGalleryModal
      :galleries="images"
      :isGalleryOpen="isGalleryOpen"
      @update:isGalleryOpen="isGalleryOpen = $event"
      :initialSlide="initialSlide"
    /> -->

    <GalleryModal
      :galleries="images"
      :isGalleryOpen="isGalleryOpen"
      :initialSlide="initialSlide"
      @update:isGalleryOpen="isGalleryOpen = $event"
    />
  </div>
</template>
