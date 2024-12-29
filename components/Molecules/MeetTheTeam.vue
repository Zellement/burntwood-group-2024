<template>
    <div>
        <h2 class="mb-8 text-md text-blue">Meet the team</h2>

        <ul
            v-if="team.length"
            class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
            <li v-for="member in team" :key="member._uid">
                <div class="relative aspect-square">
                    <single-picture
                        :img-data="{
                            url: member.content.photo.filename,
                            alt: member?.name
                        }"
                        class="h-full w-full object-cover"
                    />
                    <p class="absolute bottom-0 left-0 bg-white px-2 py-1">
                        {{ member.name }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
const storyblokStore = useStoryblokStore()

const team = ref<any[]>([])

const fetchTeam = async () => {
    team.value = await storyblokStore.fetchTeamMembers()
}

onMounted(() => {
    fetchTeam()
})
</script>
