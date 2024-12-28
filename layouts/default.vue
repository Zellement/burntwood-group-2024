<template>
    <div class="layout pb-8">
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
