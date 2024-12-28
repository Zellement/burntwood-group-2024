<template>
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2419.5149013675136!2d-1.944362822560345!3d52.66873910394229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870a07dde638153%3A0xd3cc00493d8d4848!2sBurntwood%20Group!5e0!3m2!1sen!2suk!4v1735422971111!5m2!1sen!2suk"
        class="h-72 w-full lg:h-96"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <div class="site-footer bg-slate-100 text-slate-600">
        <footer
            role="contentinfo"
            class="container container-px relative z-10 flex w-full flex-col items-start py-4 text-sm transition-transform duration-500"
        >
            <phone-number />
            <email-address />
            <p class="flex items-start gap-1">
                <Icon
                    name="material-symbols:pin-drop-rounded"
                    class="size-4 flex-shrink-0 translate-y-1"
                />
                5b Plant Lane Business Park, Plant Lane, Burntwood,
                Staffordshire, WS7 3GN
            </p>
            <p class="mt-4">
                Burntwood Group is a registered company in England.<br />

                Registered Number: 3732485 &bull; VAT Number: 900 5461 61
            </p>

            <p class="mt-4">
                &copy; Burntwood Group {{ date }}. All Rights Reserved
            </p>
        </footer>
    </div>
</template>

<script lang="ts" setup>
// const storyblokStore = useStoryblokStore()

const date: ComputedRef<number> = computed(() => {
    return new Date().getFullYear()
})
</script>
