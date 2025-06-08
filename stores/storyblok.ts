import { defineStore } from 'pinia'
import type { RuntimeConfig } from 'nuxt/schema'

// TS Interfaces & Types

interface State {
    currentStory: AllTypes | null
    globalOptions: DataGlobalOptionsStoryblok | null
    relatedPages: AllTypes[] | null
    // Booleans
    dataLoaded: boolean
    dataIsLoading: boolean
    firstLoad: boolean
}

// Define a minimal type for $storyblokClient
interface StoryblokClient {
    get: (path: string, params?: any) => Promise<any>
}

interface NuxtApp {
    $storyblokClient: StoryblokClient
}

// Consts

export const useStoryblokStore = defineStore('storyblok', {
    state: (): State => ({
        currentStory: null,
        globalOptions: null,
        relatedPages: null,
        dataLoaded: false,
        dataIsLoading: false,
        firstLoad: true
    }),
    getters: {
        getCurrentStory(state): AllTypes | null {
            return state.currentStory
        },
        getCurrentStorySeoMetaTags(state): MetaTags | null {
            return {
                title:
                    state.currentStory?.content?.metaTitle ||
                    state.currentStory?.name,
                description: state.currentStory?.content?.metaDescription || '',
                og_title: state.currentStory?.content?.metaTitle || '',
                og_description:
                    state.currentStory?.content?.metaDescription || '',
                og_image: state.currentStory?.content?.image || ''
            }
        }
    },
    actions: {
        async fetchStoryblokData(
            fullPath: string,
            options?: any
        ): Promise<any> {
            const nuxtApp: NuxtApp = useNuxtApp() as unknown as NuxtApp
            const $storyblokClient: StoryblokClient = nuxtApp.$storyblokClient
            const { $preview } = useNuxtApp()
            const version = $preview ? 'draft' : 'published'
            try {
                const response = await $storyblokClient.get(fullPath, {
                    version: version,
                    ...options
                })
                if (!response.data) {
                    throw new Error('No data')
                }
                return response
            } catch (error: any) {
                console.warn('Storyblok fetch failed:', error)
                throw new Error('Story not found')
            }
        },

        async fetchStory(queryParam: string): Promise<void> {
            this.dataIsLoading = true
            this.dataLoaded = false
            const config = useRuntimeConfig()
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${queryParam}`,
                    {
                        resolve_links: 'story',
                        cv: config.public.STORYBLOK_CV_DISABLED
                            ? +new Date()
                            : null,

                        resolve_relations: [
                            'templatePage.heroButtons',
                            'templatePage.mainContact'
                        ]
                    }
                )

                this.currentStory = response.data?.story
                this.dataLoaded = true
                this.dataIsLoading = false
                this.firstLoad = false
            } catch (error) {
                console.log(error)
                throw new Error('Story not found')
            }
        },

        async fetchGlobalOptions(): Promise<void> {
            const config: RuntimeConfig = useRuntimeConfig()
            try {
                const response = await this.fetchStoryblokData(
                    `cdn/stories/${config.public.STORYBLOK_GLOBAL_OPTIONS_ID}`,
                    {
                        resolve_relations: [
                            'dataGlobalOptions.navigation',
                            'navItem.titlePage',
                            'navItem.subPages'
                        ]
                    }
                )
                this.globalOptions = response.data?.story
            } catch (error) {
                throw error
            }
        },

        async fetchRelatedPages(
            startsWith: string,
            excludesSlug: string
        ): Promise<void> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'templatePage',
                    per_page: 100,
                    starts_with: startsWith,
                    excluding_slugs: excludesSlug
                })
                this.relatedPages = response.data?.stories
            } catch (error) {
                throw error
            }
        },

        async fetchTeamMembers(): Promise<any> {
            try {
                const response = await this.fetchStoryblokData(`cdn/stories/`, {
                    content_type: 'dataSinglePerson',
                    filter_query: {
                        hideFromTeamListing: {
                            is: false
                        }
                    }
                })
                console.log(response)
                return response.data?.stories
            } catch (error) {
                throw error
            }
        },

        // Fetches required data once in app.vue
        async fetchRequired(): Promise<void> {
            await this.fetchGlobalOptions()
        }
    }
})
