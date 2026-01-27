<script setup>
import { computed } from 'vue';

const props = defineProps({
    galleries: {
        type: Array,
        required: true
    }
});

const isMobile = computed(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
});

const leftLayoutClass = computed(() => {
    return props.galleries.length === 1 ? 'w-full' : 'w-1/2';
});

const rightLayoutClass = computed(() => {
    if (isMobile.value) {
        return 'grid-rows-2';
    }
    if (props.galleries.length === 2 || props.galleries.length === 3) {
        return 'grid-cols-1';
    }
    if (props.galleries.length === 4) {
        return 'grid-cols-2';
    }
    return 'grid-cols-2 grid-rows-2';
});

const emit = defineEmits(['openGallery']);

const openGallery = (index) => {
    emit('openGallery', index);
};
</script>

<template>
    <div class="w-full h-100">
        <div class="w-full h-full flex gap-2 rounded-xl overflow-hidden relative">
            <div
                :class="`${leftLayoutClass} h-full relative overflow-hidden cursor-pointer`"
                @click="openGallery(0)"
            >
                <div
                    class="w-full h-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${galleries[0]?.url})` }"
                ></div>
            </div>

            <div v-if="galleries.length > 1" class="w-1/2 h-full relative overflow-hidden">
                <div :class="`w-full h-full grid ${rightLayoutClass} gap-2`">
                    <div
                        v-for="(img, index) in galleries.slice(1, isMobile ? 3 : 5)"
                        :key="index"
                        :class="`w-full h-full bg-cover bg-center overflow-hidden cursor-pointer ${index === 0 && galleries.length === 4 ? 'col-span-2' : ''}`"
                        :style="{ backgroundImage: `url(${img.url})` }"
                        @click="openGallery(index + 1)"
                    ></div>
                </div>

                <!-- Image counter overlay -->
                <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg text-white text-sm font-medium">
                    {{ galleries.length }}
                </div>

                <!-- Gallery button overlay -->
                <button
                    class="absolute bottom-4 right-4 bg-white/85 px-4 py-2 rounded-lg shadow hover:shadow-md transition flex items-center gap-2 font-medium text-sm cursor-pointer"
                    @click="openGallery(0)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    Gallery
                </button>
            </div>
        </div>
    </div>
</template>
