<template>
    <div v-if="relatedPages && relatedPages.length > 0" class="">
        <h2 class="mb-8 text-md text-blue">See also...</h2>
        <!-- {{ relatedPages }} -->
        <ul
            class="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <li v-for="page in relatedPages" :key="page.id">
                <nuxt-link
                    class="flex flex-col gap-2 p-2 transition-colors hover:bg-blue hover:text-white"
                    :to="getUrl(page.full_slug)"
                >
                    <single-picture
                        :img-data="{
                            url: page.content.heroMedia.filename ?? '',
                            alt: page.content.heroMedia.alt ?? ''
                        }"
                        class="aspect-video"
                    />
                    {{ page.name }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const relatedPages: ComputedRef<any> = computed(() => {
    return storyblokStore.relatedPages
})

const { getUrl } = useUrlUtils()
</script>
