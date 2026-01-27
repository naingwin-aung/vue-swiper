<script setup lang="ts">
import { ref } from "vue";
import { X } from "lucide-vue-next";
import Galleria from 'primevue/galleria';

interface Props {
  isGalleryOpen: boolean;
  galleries: { url: string }[];
  initialSlide?: number;
}

const props = withDefaults(defineProps<Props>(), {
  initialSlide: 0,
});

const emit = defineEmits<{
  (e: "update:isGalleryOpen", value: boolean): void;
}>();

const closeDialog = (e: MouseEvent) => {
  e.stopPropagation();
  emit("update:isGalleryOpen", false);
};
</script>

<template>
  <div
    v-if="isGalleryOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs"
    @click.stop
  >
    <button
      @click="closeDialog"
      class="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition cursor-pointer"
    >
      <X class="w-6 h-6 text-white" />
    </button>

    <div class="w-full max-w-5xl h-[80vh] px-4 flex flex-col gap-4" @click.stop>
      <Galleria
        :value="galleries"
        :numVisible="7"
        containerStyle="width: 100%; height: 100%; margin: auto; border: none"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item?.url"
            style="width: 100%; height: 630px; object-fit: contain"
          />
        </template>
        <template #thumbnail="slotProps">
          <img
            :src="slotProps.item?.url"
            style="width: 140px; height: 80px; object-fit: contain"
          />
        </template>
      </Galleria>
    </div>
  </div>
</template>
