<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import { navTitle as title } from '$lib/store.ts'
  // export let title: string
  const dispatch = createEventDispatcher()

  const goBack = () => goto('/')
  const addNewItem = () => dispatch('addNewItem')
</script>

<nav
  class="
    w-auto h-12 bg-neutral-800/30 backdrop-blur-md
    fixed top-0 left-0 right-0 z-40 shadow-xl
    flex justify-center items-center text-xl

  "
>
  {#if $page.url.pathname !== '/'}
    <img
      src="/chevron-back.svg"
      alt="go-back"
      class="button back"
      on:click={goBack}
    />
  {/if}
  <h1>{$title}</h1>
  <img
    src="/add.svg"
    alt="add new item"
    class="button add"
    on:click={addNewItem}
  />
</nav>

<style>
  nav {
    max-width: var(--ch-width);
    margin: 0 auto;
  }
  .button {
    width: 32px;
    filter: invert(1);
    cursor: pointer;
    position: absolute;
  }
  .button.back {
    left: 0;
  }
  .button.add {
    right: 0;
  }
</style>
