<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const yes = () => dispatch('yes')
  const cancel = () => dispatch('cancel')
</script>

<div
  class="b 
  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  bg-neutral-800/40 backdrop-blur-sm
  w-screen h-screen  z-40"
  on:click={cancel}
/>

<div
  class="confirm bg-neutral-800
   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
   z-40 rounded-md shadow-xl z-50 p-4"
>
  <h1>Are you sure you want to delete this item?</h1>
  <button
    class="rounded-md w-full p-2 my-2
        bg-red-800/80 hover:bg-red-700 
        hover:drop-shadow-xl active:bg-red-800"
    on:click={yes}
  >
    Yes
  </button>

  <button
    class="rounded-md w-full p-2 my-2
        bg-neutral-800/10 hover:bg-neutral-700 
        hover:drop-shadow-xl active:bg-neutral-800"
    on:click={cancel}
  >
    No
  </button>
</div>
