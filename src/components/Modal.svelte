<script lang="ts">
  import { supabase, getInfo, getPoster } from '$lib/db.ts'
  import { goto } from '$app/navigation'
  export let title, isOpen

  let query,
    result = []

  // API/first_letter/word.json
  const API = 'https://totasks-backend.vercel.app/api/imdb.js?q='

  const handleChange = async () => {
    const res = await fetch(`${API}${query}`).then((r) => r.json())
    result = res
  }

  const add = async (item) => {
    const { data, error } = await supabase.from('ws').insert([
      {
        name: item.l,
        IMDB: item.id,
        data: { s: 0, e: 0, t: '0:00' },
      },
    ])
    isOpen = false
    location.reload()
  }

  const closeModal = () => (isOpen = false)
</script>

<div
  class="b 
  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
  bg-neutral-800/40 backdrop-blur-sm
  w-screen h-screen  z-40"
  on:click={closeModal}
/>

<div
  class="modal bg-neutral-800
absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
z-40 rounded-md shadow-xl z-50
"
>
  <div
    class="sticky bg-neutral-800/30 backdrop-blur-md top-0 left-0 w-full p-4"
  >
    <h1 class="text-center text-xl">{title}</h1>
    <input
      class="p-2 w-full rounded"
      type="text"
      bind:value={query}
      on:input={handleChange}
    />
  </div>
  {#each result as item}
    <div
      class="search-item px-4 grid grid-cols-3 gap-2 my-4 cursor-pointer"
      on:click={() => add(item)}
    >
      <img class="rounded" src={item?.i?.imageUrl} alt={item?.l} />
      <div class="search-item__info flex col-span-2">
        <h1>{item?.l}</h1>
      </div>
    </div>
  {/each}
</div>

<style>
  .modal {
    width: 320px;
    height: 400px;
    overflow: hidden scroll;
  }
</style>
