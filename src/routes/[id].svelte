<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { supabase, getInfo, getPoster } from '$lib/db.ts'
  import { list } from '$lib/store.ts'
  import Loading from '../components/Loading.svelte'
  import Delete from '../components/Delete.svelte'

  const { id } = $page.params

  let state = {
    season: 0,
    ep: 0,
    time: '0:00',
  }

  let info,
    loading = true,
    deleteAlertOpen = false

  onMount(async () => {
    // try local store first

    if ($list !== 'loading' && Array.isArray($list)) {
      let c = $list.find((d) => d.id.toString() === id)
      if (c) info = c
      // console.log(c)
    } else {
      const { data, error } = await supabase.from('ws').select('*').eq('id', id)
      info = data[0]
      info.more = await getInfo(info.IMDB)

      // if OMB doesn't have a poster
      if (info.more.Poster === 'N/A')
        info.more.Poster = await getPoster(info.IMDB)
    }
    // update our local state with DB
    state.season = info.data.s
    state.ep = info.data.e
    state.time = info.data.t

    loading = false
    // console.log(info)
  })

  const updateData = async () => {
    let now = new Date(new Date() - 3600 * -2000).toJSON()
    const { data, error } = await supabase
      .from('ws')
      .update({
        data: { s: state.season, e: state.ep, t: state.time },
        last_modified: now,
      })
      .eq('id', id)
    goto('/')
  }

  const deleteItem = async () => {
    const { data, error } = await supabase.from('ws').delete().match({ id })
    goto('/')
  }

  const cancel = () => (deleteAlertOpen = false)
</script>

{#if loading}
  <Loading />
{:else}
  <main class="p-4">
    <h1 class="text-center text-2xl font-semibold">{info.name}</h1>

    <img
      class="w-48 rounded-md mx-auto my-2"
      src={info?.more?.Poster}
      alt={info?.more?.Title}
    />

    <p
      class="text-center text-xs text-neutral-400
  w-48 flex justify-between mx-auto mb-4
"
    >
      <span>{info.more.imdbRating} / 10</span>
      <span>60 min</span>
      <span>{info.more.Year}</span>
    </p>

    <h5 class="text-xs">{info.more.Plot}</h5>

    <div class="update flex justify-between mt-4 text-base">
      <input class="rounded w-24 p-2" type="number" bind:value={state.season} />
      <input class="rounded w-24 p-2" type="number" bind:value={state.ep} />
      <input class="rounded w-28 p-2" type="text" bind:value={state.time} />
    </div>

    <button
      class="rounded-md w-full p-2 my-4
bg-violet-800 hover:bg-violet-700 
hover:drop-shadow-xl active:bg-violet-800"
      on:click={updateData}
    >
      update
    </button>

    <button
      class="rounded-md w-full p-2 my-2
bg-red-800/10 hover:bg-red-700 
hover:drop-shadow-xl active:bg-red-800"
      on:click={() => (deleteAlertOpen = true)}
    >
      delete
    </button>
  </main>
{/if}

{#if deleteAlertOpen}
  <Delete on:yes={deleteItem} on:cancel={cancel} />
{/if}
