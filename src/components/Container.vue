<script setup>
defineProps({
    className: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <section
        :class="[
            'w-full',
            'max-w-295',
            'mx-auto',
            'px-4',
            'md:px-6',
            'lg:px-8',
            className
        ]"
    >
        <slot />
    </section>
</template>
