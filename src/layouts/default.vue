<script lang="ts" >


</script>

<template>
  <div class="relative antialiased">
    <header class="d-header">
      <div class="flex flex-none h-full container !max-w-screen-2xl mx-auto px-2 md:px-6">
        <!-- action -->
        <div class="flex items-center lg:hidden">
          <button class="inline-flex text-xl p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <!-- icon -->
        <div class="flex items-center flex-1 lg:flex-none">
          <a
            href="/"
            class="inline-flex items-center text-xl lg:text-2xl font-semibold"
          >
            <img
              src="@/assets/icon.svg"
              class="inline-flex mr-1 lg:mr-3 h-8 lg:h-10"
              alt="logo"
            >
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