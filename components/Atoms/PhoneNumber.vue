<template>
    <nuxt-link :to="`tel:${telephone}`" class="">
        {{ telephone }}
    </nuxt-link>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const telephone: ComputedRef<string> = computed(() => {
    return storyblokStore?.globalOptions?.content.telephone
})
</script>
