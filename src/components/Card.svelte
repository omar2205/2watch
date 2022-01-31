<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  import { supabase, getInfo, getPoster } from '$lib/db.ts'
  export let title
  export let data

  onMount(async () => {
    /*
    const { publicURL: poster, error } = await supabase
      .storage
      .from('watch')
      .getPublicUrl(`${data.IMDB}.jpg`)
  */
    if (data.more.Poster === 'N/A')
      // data.more.Poster = poster
      data.more.Poster = await getPoster(data.IMDB)
  })

  const openCard = (id) => goto(`/${id}`)
</script>

<div
  class="card grid grid-cols-3 gap-2
bg-neutral-800 p-2 my-4 rounded 
hover:rounded-md hover:drop-shadow-xl
cursor-pointer"
  on:click={() => openCard(data.id)}
>
  <img src={data.more?.Poster} alt={title} />

  <div class="card__data flex flex-col col-span-2">
    <h1 class="text-xl">{title}</h1>
    <p class="text-xs text-neutral-500 mb-2">
      {data.more.Year} - {data.more.imdbRating} / 10 - {data.more.Runtime}
    </p>
    <h4 class="text-[11px] text-neutral-300 line-clamp-3">{data.more.Plot}</h4>
    <h3 class="text-neutral-100 text-lg mt-auto">
      {'S' + data.data.s + ' - E' + data.data.e + ' | ' + data.data.t}
    </h3>
  </div>
</div>
