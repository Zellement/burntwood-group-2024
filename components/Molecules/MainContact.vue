<template>
    <div
        v-if="!currentStory.content.hideBottomCta"
        class="flex flex-col gap-4 rounded bg-yellow p-4"
    >
        <p class="text-md">
            Need a quote for <strong>{{ currentStory.name }}</strong
            >?
        </p>
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div
                v-if="mainContact && mainContact?.name"
                class="flex items-center gap-4"
            >
                <div
                    v-if="mainContact?.content.photo?.filename"
                    class="aspect-square size-20"
                >
                    <nuxt-img
                        :src="mainContact?.content.photo?.filename"
                        :alt="mainContact.name"
                        class="rounded-full object-cover"
                        provider="storyblok"
                    />
                </div>
                <p>
                    Contact <strong>{{ mainContact.name }}</strong> <br />on
                    <a
                        class="underline"
                        :href="`tel:${mainContact.content.mobile}`"
                    >
                        {{ mainContact.content.mobile }}
                    </a>
                </p>
            </div>
            <p class="flex items-center gap-2">
                <template v-if="mainContact">Or call</template>
                <template v-else>Call</template>
                the office on <phone-number class="underline" />
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const currentStory = computed(() => {
    return storyblokStore.currentStory
})

const mainContact: ComputedRef<any> = computed(() => {
    return currentStory.value.content.mainContact
})
</script>
