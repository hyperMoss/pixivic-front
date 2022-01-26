<script lang="ts" >
import { BeakerIcon } from '@heroicons/vue/solid'
export default {
  components: {
    BeakerIcon,
  },
}

</script>

<template>
  <div class="relative antialiased">
    <header class="d-header">
      <div class="flex flex-none h-full container !max-w-screen-2xl mx-auto px-2 md:px-6">
        <!-- action -->
        <div class="flex items-center lg:hidden">
          <button class="inline-flex text-xl p-2">
            <BeakerIcon class="h-5 w-5 text-blue-500" />
          </button>
        </div>
        <!-- icon -->
        <div class="flex items-center flex-1 lg:flex-none">
          <a
            href="/"
            class="inline-flex items-center text-xl lg:text-2xl font-semibold"
          >
            Pixivic
          </a>
        </div>
        <!-- search -->
        <div class="flex items-center order-last ml-2 lg:order-none lg:flex-1 lg:ml-4 xl:ml-10">
          Search
        </div>
        <!-- menu -->
        <div class="hidden lg:flex items-center flex-1">
          meun
        </div>
        <!-- icon -->
        <div class="flex items-center lg:space-x-3 lg:pl-3 xl:pl-6">
          icon
        </div>
      </div>
    </header>
    <div>
      <router-view />
    </div>
  </div>
</template>