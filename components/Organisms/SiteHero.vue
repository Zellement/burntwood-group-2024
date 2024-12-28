<template>
    <div class="grid bg-blue text-white lg:grid-cols-2">
        <div class="col-span-1 col-start-2 row-start-1 bg-red-300">
            <single-picture
                :img-data="{
                    url: currentStory.content.heroMedia.filename ?? '',
                    alt: currentStory.content.heroMedia.alt ?? ''
                }"
                class="aspect-square h-full w-full object-cover lg:aspect-video"
            />
        </div>

        <div class="col-span-full row-start-1 grid grid-cols-2">
            <div
                class="container container-px flex w-full flex-col items-center"
            >
                <div class="my-auto flex w-full flex-col">
                    <p v-if="currentStory.content.heroText" class="text-lg">
                        {{ currentStory.content.heroText }}
                    </p>
                    <rich-text
                        v-if="currentStory.content.heroSubtext"
                        :content="currentStory.content.heroSubtext"
                        class="hero-richtext"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})
</script>
