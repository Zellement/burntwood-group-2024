<template>
    <nuxt-layout>
        <nuxt-page />
    </nuxt-layout>
    <page-transition v-if="!$preview" :class="pageTransitionClasses" />
</template>

<script setup lang="ts">
const uiStore = useUiStore()
const storyblokStore = useStoryblokStore()
const route = useRoute()
const { $preview } = useNuxtApp()

/* --------------------------
// Computed
-------------------------- */

const animationsDisabled: ComputedRef<boolean> = computed(() => {
    return uiStore.animationsDisabled
})

const isAnyModalActive: ComputedRef<boolean> = computed(() => {
    return uiStore.showMobileNav
})

const pageTransitionClasses: ComputedRef<string> = computed(() => {
    return animationsDisabled.value
        ? 'opacity-0 pointer-events-none'
        : 'opacity-100'
})

const pageName: ComputedRef<string> = computed(() => {
    return storyblokStore.currentStory.name
})

const metaTitle: ComputedRef<string | null> = computed(
    () => storyblokStore.currentStory.content.metaTitle
)

const metaDescription: ComputedRef<string | null> = computed(
    () => storyblokStore.currentStory.content.metaDescription
)

const storyID: ComputedRef<string> = computed(() => {
    return storyblokStore.currentStory.id
})

/* --------------------------
// Hooks and composables
-------------------------- */

//close modals on route change
watch(
    () => route.fullPath,
    () => {
        uiStore.showMobileNav = false
    }
)

watch(
    () => storyID.value,
    (newVal, oldVal) => {
        if (newVal === oldVal) return
        useSeoMeta({
            title: metaTitle.value || pageName.value,
            description: metaDescription.value || ''
        })
    },
    { immediate: true }
)

onMounted(async () => {
    await storyblokStore.fetchRequired()

    if ($preview) {
        const script = document.createElement('script')
        script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js'
        script.async = true
        script.onload = () => {
            const { StoryblokBridge, location } = window
            const storyblokInstance = new StoryblokBridge({
                preventClicks: true
            })

            storyblokInstance.on(['published', 'change'], () => {
                // reload page if save or publish is clicked
                location.reload()
            })
        }
        document.head.appendChild(script)
    }
})

useHead({
    // Prevent page scrolling when mobile nav is open
    bodyAttrs: {
        class: computed((): string => {
            if (isAnyModalActive.value) return 'overflow-hidden'
            return ''
        })
    }
})
</script>
