<template>
    <section v-if="media && media.length > 0">
        <embla-carousel
            ref="carouselRef"
            :options="{
                loop: true,
                align: 'start'
            }"
            show-dots
            :show-buttons="media.length > 1"
            :media="media"
        >
            <template #carousel-items>
                <div
                    v-for="slide in media"
                    :key="slide.id"
                    :class="[
                        'embla__slide relative max-h-[90vh]',
                        'flex h-full w-full xl:max-h-[70vh]'
                    ]"
                >
                    <single-picture
                        class="aspect-square md:aspect-landscape"
                        :img-data="{
                            url: slide.filename ?? '',
                            alt: slide.alt ?? ''
                        }"
                        sizes="336px lg:800px"
                    />
                </div>
            </template>
        </embla-carousel>
    </section>
</template>

<script lang="ts" setup>
import type { EmblaCarouselType } from 'embla-carousel'
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const carouselRef = ref<{ emblaApi: EmblaCarouselType | null } | null>(null)

const media: ComputedRef<any> = computed(() => {
    return currentStory.value.content.gallery
})
</script>
