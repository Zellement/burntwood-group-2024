<template>
    <div class="layout">
        <site-seo />
        <site-header />
        <site-hero />
        <main>
            <slot />
        </main>
        <site-footer />
        <sticky-mobile-bar v-if="viewport.isLessThan('lg')" />
    </div>
</template>

<script setup lang="ts">
const viewport = useViewport()
</script>
