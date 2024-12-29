<template>
    <div class="grid bg-blue text-white lg:grid-cols-2">
        <div class="lg:col-span-1 lg:col-start-2 lg:row-start-1">
            <single-picture
                :img-data="{
                    url: currentStory.content?.heroMedia?.filename ?? '',
                    alt: currentStory.content?.heroMedia?.alt ?? ''
                }"
                class="aspect-video h-full w-full object-cover"
            />
        </div>

        <div
            class="flex flex-col lg:col-span-full lg:row-start-1 lg:grid lg:grid-cols-2"
        >
            <div
                class="container container-px flex w-full flex-col items-center py-4"
            >
                <div class="my-auto flex w-full flex-col">
                    <p class="text-lg font-bold">
                        {{ title }}
                    </p>
                    <p v-if="currentStory.content?.brand" class="italic">
                        by {{ currentStory.content?.brand }}
                    </p>
                    <rich-text
                        v-if="currentStory.content?.heroSubtext"
                        :content="currentStory.content?.heroSubtext"
                        class="hero-richtext mt-4"
                    />
                    <div
                        v-if="heroButtons && heroButtons.length > 0"
                        class="mt-4 flex items-start gap-2"
                    >
                        <nuxt-link
                            v-for="(button, index) in heroButtons"
                            :key="index"
                            class="btn hover:text-yellow"
                            :to="getUrl(button.full_slug)"
                        >
                            {{ button.name }}
                        </nuxt-link>
                    </div>
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

const { getUrl } = useUrlUtils()

const title: ComputedRef<string> = computed(() => {
    return currentStory.value?.content?.heroText.length > 0
        ? currentStory.value?.content?.heroText
        : currentStory.value?.name
})

const heroButtons: ComputedRef<any> = computed(() => {
    return currentStory.value?.content?.heroButtons
})
</script>
