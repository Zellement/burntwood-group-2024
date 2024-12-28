<template>
    <nuxt-link
        :to="`mailto:${emailAddress}`"
        class="flex items-center gap-1 transition-colors hover:text-yellow"
    >
        <Icon name="material-symbols:mail-sharp" class="size-4" />
        {{ emailAddress }}
    </nuxt-link>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const emailAddress: ComputedRef<string> = computed(() => {
    return storyblokStore?.globalOptions?.content.email
})
</script>
