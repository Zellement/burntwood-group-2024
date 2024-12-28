<template>
    <div class="fixed bottom-0 left-0 grid w-full grid-cols-2 gap-1 p-1">
        <button
            class="relative z-50 flex w-full items-center justify-center gap-1 bg-blue p-1 text-white"
            aria-label="Open navigation"
            @click="uiStore.toggleBoolean('showMobileNav')"
        >
            <Icon class="mt-0.5 size-4" name="ic:baseline-menu" />
            <span class="">Menu</span>
        </button>
        <phone-number class="bg-yellow" />
    </div>
</template>

<script lang="ts" setup>
const uiStore = useUiStore()
</script>
