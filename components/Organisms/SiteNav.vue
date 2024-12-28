<template>
    <nav v-if="navItems" class="">
        <ul class="" :class="ulClasses">
            <li>
                <nuxt-link to="/" @click="uiStore.showMobileNav = false">
                    Home
                </nuxt-link>
            </li>
            <li v-for="navItem in navItems" :key="navItem.uuid" class="group">
                <nuxt-link
                    :to="getUrl(navItem.titlePage.full_slug)"
                    @click="uiStore.showMobileNav = false"
                >
                    {{ navItem.titlePage.name }}
                </nuxt-link>
                <ul v-if="navItem.subPages.length > 0" class="group-hover:flex">
                    <li
                        v-for="subnavItem in navItem.subPages"
                        :key="subnavItem.uuid"
                    >
                        <nuxt-link
                            :to="getUrl(subnavItem.full_slug)"
                            @click="uiStore.showMobileNav = false"
                        >
                            {{ subnavItem.name }}
                        </nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
const { getUrl } = useUrlUtils()

const storyblokStore = useStoryblokStore()
const uiStore = useUiStore()

defineProps<{
    ulClasses?: string
}>()

const navItems: ComputedRef<TemplatePageStoryblok[] | null | undefined> =
    computed(() => {
        return storyblokStore?.globalOptions?.content.navigation
    })
</script>
