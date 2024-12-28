<template>
    <nuxt-link
        :to="`tel:${telephone}`"
        class="flex items-center gap-1 transition-colors hover:text-yellow"
    >
        <Icon name="material-symbols:call-sharp" class="size-4" />
        {{ telephone }}
    </nuxt-link>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const telephone: ComputedRef<string> = computed(() => {
    return storyblokStore?.globalOptions?.content.telephone
})
</script>
