<template>
    <div v-if="renderedText" v-dompurify-html="renderedText" />
</template>

<script lang="ts" setup>
import { richTextResolver } from '@storyblok/richtext'

interface Props {
    content: any
}

const props = defineProps<Props>()

const { render } = richTextResolver({
    optimizeImages: {
        loading: 'lazy',
        width: 800,
        height: 600,
        srcset: [400, 800, 1200, 1600],
        sizes: ['(max-width: 400px) 100vw', '40vw'],
        filters: {
            format: 'webp',
            quality: 70
        }
    }
})

const renderedText: ComputedRef<unknown> = computed(() => {
    if (typeof props?.content === 'string') {
        return props?.content
    }

    return render(props?.content)
})
</script>
