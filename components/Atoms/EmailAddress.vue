<template>
    <nuxt-link :to="`mailto:${emailAddress}`" class="">
        {{ emailAddress }}
    </nuxt-link>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const emailAddress: ComputedRef<string> = computed(() => {
    return storyblokStore?.globalOptions?.content.email
})
</script>
