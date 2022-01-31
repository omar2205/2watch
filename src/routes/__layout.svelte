<script lang="ts">
  import '../app.css'
  import Navbar from '../components/Navbar.svelte'
  import Modal from '../components/Modal.svelte'
  let isModalOpen = false

  const openModal = () => (isModalOpen = true)
</script>

<div id="app" class="bg-neutral-900">
  <Navbar on:addNewItem={openModal} />
  <slot />
</div>

{#if isModalOpen}
  <Modal title="Add new item" bind:isOpen={isModalOpen} />
{/if}

<style>
  #app {
    width: 400px;
    height: 600px;
    padding-top: 60px;
    margin: 0 auto;
    overflow: hidden scroll;
  }
</style>
