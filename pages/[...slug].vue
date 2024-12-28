<template>
    <div class="container container-px grid grid-cols-2">
        <div class="py-4 xl:py-8">
            <rich-text
                class="content"
                :content="currentStory?.content?.content"
            />
        </div>
        <!-- <block-loop
            :key="`${id}__${currentStory?.id}`"
            :blocks="currentStory?.content.body"
        /> -->
    </div>
</template>

<script setup lang="ts">
const storyblokStore = useStoryblokStore()

// const id = useId()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})
</script>
