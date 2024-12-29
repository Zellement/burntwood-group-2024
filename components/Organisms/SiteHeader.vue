<template>
    <header role="banner" class="z-50 w-full py-4 lg:py-0">
        <div class="hidden bg-blue py-1 text-sm lg:flex">
            <div
                class="container container-px flex w-full items-end justify-end gap-4 text-white"
            >
                <email-address class="hover:text-yellow" />
                <phone-number class="hover:text-yellow" />
            </div>
        </div>
        <div class="grid-layout container container-px lg:py-2">
            <div
                class="relative col-span-full flex w-full items-center justify-between py-2 lg:col-span-3"
            >
                <nuxt-link to="/" class="mx-auto">
                    <site-brand
                        class="aspect-[937.9/276.3] w-full max-w-56 lg:ml-0"
                    />
                </nuxt-link>
            </div>

            <site-nav
                v-if="isDesktop"
                class="site-nav-desktop col-span-9 col-start-4"
            />
        </div>

        <Transition name="slide-up">
            <div
                v-if="uiStore.showMobileNav"
                class="fixed inset-0 z-[9999] h-screen w-full overflow-y-scroll bg-blue-800 transition-transform duration-300"
            >
                <div class="flex h-full flex-col p-8">
                    <site-nav class="site-nav-mobile col-span-full" />
                    <button
                        class="btn mt-auto self-end text-white"
                        @click="uiStore.toggleBoolean('showMobileNav')"
                    >
                        Close
                    </button>
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup lang="ts">
/* --------------------------
// Interfaces and types
-------------------------- */
interface State {
    showHeader: boolean
    lastScrollPosition: number
    scrollOffset: number
}

/* --------------------------
// States, stores and props
-------------------------- */
const uiStore = useUiStore()
const viewport = useViewport()

const state: State = reactive({
    showHeader: true,
    lastScrollPosition: 0,
    scrollOffset: 40
})

/* --------------------------
// Computed
-------------------------- */

// const headerClasses: ComputedRef<string> = computed(() => {
//     return state.showHeader ? 'translate-y-0' : '-translate-y-full'
// })
// const headerBgClasses: ComputedRef<string> = computed(() => {
//     return uiStore.showMobileNav ? 'bg-blue text-white' : ' text-white'
// })

const isDesktop: ComputedRef<boolean> = computed(() => {
    return viewport.isGreaterOrEquals('lg')
})

/* --------------------------
// Methods
-------------------------- */
const onScroll = (): void => {
    if (window.scrollY < 0) {
        return
    }
    if (
        Math.abs(window.scrollY - state.lastScrollPosition) < state.scrollOffset
    ) {
        return
    }
    state.showHeader = window.scrollY < state.lastScrollPosition
    state.lastScrollPosition = window.scrollY
}

/* --------------------------
// Hooks and composables
-------------------------- */
onMounted((): void => {
    state.lastScrollPosition = window.scrollY
    window.addEventListener('scroll', onScroll)
})
</script>
