<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { X, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { Navigation, Pagination, Scrollbar, A11y, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';

interface Props {
    isGalleryOpen: boolean;
    galleries: { url: string }[];
    initialSlide?: number;
}

const props = withDefaults(defineProps<Props>(), {
    initialSlide: 0,
});

const emit = defineEmits<{
    (e: 'update:isGalleryOpen', value: boolean): void;
}>();

const prevRef = ref<HTMLButtonElement | null>(null);
const nextRef = ref<HTMLButtonElement | null>(null);
const swiperInstance = ref<SwiperType | null>(null);
const thumbsSwiper = ref<SwiperType | null>(null);
const activeIndex = ref(0);
const isMobile = ref(false);

const modules = [Navigation, Pagination, Scrollbar, A11y, Thumbs];

const breakpoints = {
    769: {
        pagination: false,
    },
    0: {
        pagination: {
            clickable: true,
        },
        navigation: {
            enabled: false,
        },
    },
};

const thumbsSwiperValue = computed(() => {
    if (!thumbsSwiper.value) return undefined;
    if (thumbsSwiper.value.destroyed) return undefined;
    return thumbsSwiper.value;
});

const handleSwiperInit = (swiper: SwiperType) => {
    swiperInstance.value = swiper;
    swiper.slideTo(props.initialSlide, 0);
};

const handleSlideChange = (swiper: SwiperType) => {
    activeIndex.value = swiper.activeIndex;
};

const setThumbsSwiper = (swiper: SwiperType) => {
    thumbsSwiper.value = swiper;
};

const closeDialog = (e: MouseEvent) => {
    e.stopPropagation();
    emit('update:isGalleryOpen', false);
};

const slideTo = (index: number) => {
    swiperInstance.value?.slideTo(index);
};

watch(
    () => props.isGalleryOpen,
    (newVal) => {
        if (newVal) {
            document.body.style.overflow = 'hidden';
            if (swiperInstance.value) {
                swiperInstance.value.slideTo(props.initialSlide, 0);
                activeIndex.value = props.initialSlide;
            }
        } else {
            document.body.style.overflow = 'unset';
        }
    }
);

onMounted(() => {
    isMobile.value = window.innerWidth < 768;
});

onUnmounted(() => {
    document.body.style.overflow = 'unset';
});
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

        <div class="w-full max-w-4xl px-4 flex flex-col gap-4" @click.stop>
            <!-- Main Swiper -->
            <div class="custom-swiper-container">
                <button
                    v-if="galleries.length > 1 && !isMobile"
                    ref="prevRef"
                    class="gallery-swiper-button-prev-custom"
                >
                    <ChevronLeft :size="22" :stroke-width="1.5" />
                </button>

                <Swiper
                    :modules="modules"
                    :breakpoints="breakpoints"
                    :space-between="10"
                    :slides-per-view="1"
                    :pagination="{ clickable: true }"
                    :navigation="{
                        prevEl: prevRef,
                        nextEl: nextRef,
                    }"
                    :thumbs="thumbsSwiperValue ? { swiper: thumbsSwiperValue } : undefined"
                    @swiper="handleSwiperInit"
                    @slide-change="handleSlideChange"
                >
                    <SwiperSlide v-for="(gallery, index) in galleries" :key="index">
                        <div class="w-auto h-[80vh] flex items-center justify-center">
                            <img
                                :src="gallery.url"
                                :alt="`Gallery image ${index + 1}`"
                                class="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>

                <button
                    v-if="galleries.length > 1 && !isMobile"
                    ref="nextRef"
                    class="gallery-swiper-button-next-custom"
                >
                    <ChevronRight :size="22" :stroke-width="1.5" />
                </button>
            </div>

            <!-- Thumbnail Gallery -->
            <div class="w-full max-w-4xl mx-auto">
                <Swiper
                    :modules="[Navigation, Thumbs]"
                    :space-between="12"
                    slides-per-view="auto"
                    watch-slides-progress
                    class="thumbnail-swiper"
                    @swiper="setThumbsSwiper"
                >
                    <SwiperSlide
                        v-for="(gallery, index) in galleries"
                        :key="index"
                        :style="{ width: 'auto' }"
                    >
                        <div
                            :class="[
                                'cursor-pointer transition-all duration-200 rounded-lg overflow-hidden border-[1.5px] border-transparent',
                                activeIndex === index
                                    ? 'border-white opacity-100'
                                    : 'opacity-60 hover:opacity-80',
                            ]"
                            @click="slideTo(index)"
                        >
                            <img
                                :src="gallery.url"
                                :alt="`Thumbnail ${index + 1}`"
                                class="w-20 h-20 object-cover"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </div>
</template>
