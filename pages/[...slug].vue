<template>
    <div class="container container-px my-12 grid grid-cols-12 gap-y-12">
        <div
            class="col-span-full md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4"
        >
            <rich-text
                class="content"
                :content="currentStory?.content?.content"
            />
        </div>
        <main-contact class="col-span-full xl:col-span-8 xl:col-start-3" />
        <media-gallery class="col-span-full xl:col-span-8 xl:col-start-3" />
        <related-pages class="col-span-full" />
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const route = useRoute()

watchEffect(() => {
    if (currentStory.value) {
        storyblokStore.fetchRelatedPages(
            route.params.slug[0],
            currentStory.value.full_slug
        )
    }
})
</script>
