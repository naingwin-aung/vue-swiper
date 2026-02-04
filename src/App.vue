<script setup>
import { ref } from "vue";
import Container from "./components/Container.vue";
import Gallery from "./components/Gallery.vue";
import GalleryModal from "./components/GalleryModal.vue";
import SelectOptionItem from "./components/SelectOptionItem.vue";
import PrimeVueGalleryModal from "./components/PrimeVueGalleryModal.vue";

const galleries = [
  {
    url: "https://i.pinimg.com/1200x/8d/a2/33/8da23335dace52844ff1840c279c7a14.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/c9/26/54/c92654f51926c675ea63f5ba4460941c.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/bf/16/7d/bf167d3a3222136882cc9e41ab2ee2f1.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/ba/6d/ae/ba6dae4d15b45507809b8d242a5c1c88.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/3d/e9/9d/3de99dec949b4336e6d0304d1f191459.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/8d/a2/33/8da23335dace52844ff1840c279c7a14.jpg",
  },
  {
    url: "https://i.pinimg.com/1200x/c9/26/54/c92654f51926c675ea63f5ba4460941c.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/bf/16/7d/bf167d3a3222136882cc9e41ab2ee2f1.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/ba/6d/ae/ba6dae4d15b45507809b8d242a5c1c88.jpg",
  },
  {
    url: "https://i.pinimg.com/736x/3d/e9/9d/3de99dec949b4336e6d0304d1f191459.jpg",
  },
];

const date = ref();
const isGalleryOpen = ref(false);
const initialSlideNumber = ref(0);

const openGallery = (index) => {
  initialSlideNumber.value = index;
  isGalleryOpen.value = true;
};
</script>

<template>
  <Container class-name="mt-10 mb-20">
    <h1 class="text-2xl md:text-3xl font-medium mb-4">
      Bangkok Dinner Cruise white orchid river cruise from Asiatique
    </h1>

    <div class="flex flex-col md:flex-row md:items-center gap-4 mb-7">
      <div class="font-medium text-sm md:text-base">Departure piers</div>
      <div>
        <ul class="flex gap-2">
          <li class="px-2 py-1 bg-orange-200 text-orange-700 rounded text-xs">
            Asiatique The Riverfront
          </li>
          <li class="px-2 py-1 bg-orange-200 text-orange-700 rounded text-xs">
            River City Bangkok
          </li>
          <li class="px-2 py-1 bg-orange-200 text-orange-700 rounded text-xs">
            Rama 8 Bridge Pier
          </li>
        </ul>
      </div>
    </div>

    <div class="mb-6">
      <Gallery :galleries="galleries" @open-gallery="openGallery" />
    </div>

    <GalleryModal
      :galleries="galleries"
      :isGalleryOpen="isGalleryOpen"
      :initialSlide="initialSlideNumber"
      @update:isGalleryOpen="(val) => (isGalleryOpen = val)"
    />

    <!-- <PrimeVueGalleryModal
      :galleries="galleries"
      :isGalleryOpen="isGalleryOpen"
      :initialSlide="initialSlideNumber"
      @update:isGalleryOpen="(val) => (isGalleryOpen = val)"
    /> -->

    <div class="flex flex-col md:flex-row gap-5 mb-7">
      <p class="w-full md:w-3/4 p-4 border border-gray-200 rounded-xl">
        Cruise along the Chao Phraya River and enjoy a delicious dinner while
        taking in the beautiful views of Bangkok's skyline. The White Orchid
        River Cruise offers a unique dining experience with traditional Thai
        cuisine and live entertainment on board. The cruise departs from
        Asiatique The Riverfront, a popular night market and shopping area in
        Bangkok. During the cruise, you'll see famous landmarks such as Wat
        Arun, the Grand Palace, and Rama VIII Bridge illuminated at night. This
        is a perfect way to experience the beauty of Bangkok from a different
        perspective.
      </p>
      <div class="w-xs md:w-1/4 h-30 border border-gray-200 rounded-xl px-5 pt-4">
        <div class="text-lg font-medium">
          <span class="text-sm text-gray-600 me-1"> From </span>
          <span>THB 399</span>
        </div>
        <button
          class="w-full bg-orange-500 text-white py-2.5 mt-2 rounded-xl cursor-pointer hover:bg-orange-600 transition font-medium"
        >
          Select Options
        </button>
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-xl md:text-2xl font-medium mb-4">Select options</h3>
      <SelectOptionItem />
      <SelectOptionItem />
    </div>
  </Container>
</template>
