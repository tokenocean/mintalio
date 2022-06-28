<script>
  import { offset } from "$lib/store";

  export let total;
  export let loadMore;

  let pageSize = 20;
  $: pages = [...Array(Math.ceil(total / pageSize)).keys()];

  let load = (page) => {
    $offset = page * pageSize;
    loadMore();
    scrollTo(0, 0);
  };

  $: current = $offset/pageSize
</script>

{#if total > pageSize}
  <div class="flex p-4 mx-auto">
    <div class="mx-auto">
      {#each pages as _, i}
        <button
          class="rounded-full w-12 h-12"
          class:font-bold={i === current}
          on:click={() => load(i)}>{i + 1}</button
        >
      {/each}
    </div>
  </div>
{/if}

