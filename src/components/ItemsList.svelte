<script lang="ts">
  import Card from './Card.svelte'

  export let list: any
</script>

{#each $list as item}
  <Card title={item.name} data={item} />
{/each}
