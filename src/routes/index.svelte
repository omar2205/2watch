<script lang="ts">
  import { onMount } from 'svelte'
  import ItemsList from '../components/ItemsList.svelte'
  import Loading from '../components/Loading.svelte'

  import { supabase, getInfo } from '$lib/db.ts'
  import { list } from '$lib/store.ts'

  const load = async () => {
    const { data, error } = await supabase
      .from('ws')
      .select('*')
      .order('last_modified', { ascending: false })

    $list = []
    for (let i = 0; i < data.length; i++) {
      let info = await getInfo(data[i].IMDB)
      $list[i] = { ...data[i], more: info }
    }
  }

  onMount(async () => {
    await load()
  })
</script>

<main class="p-4">
  <h1 class="text-xl">Welcome to 2watch</h1>
  {#if $list === 'loading'}
    <Loading />
  {:else}
    <ItemsList {list} />
  {/if}
</main>

<style>
  main {
    width: 100%;
  }
</style>
