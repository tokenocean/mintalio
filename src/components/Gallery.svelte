<script>
  import { browser } from "$app/env";
  import { Card, Pagination } from "$comp";
  import { onMount, tick } from "svelte";
  import { offset } from "$lib/store";

  export let filtered = [];
  export let total;
  export let loadMore;

  let current = 0;
  let pageSize = 60;

  $: pages = total > 0 ? [...Array(Math.ceil(total / pageSize)).keys()] : [];

  let load = (page) => {
    current = page;
    $offset = page * pageSize;
    loadMore();
    scrollTo(0, 0);
  };

  $: leftRow = filtered.filter((a, i) => i % 3 === 0);
  $: middleRow = filtered.filter((a, i) => (i + 1) % 3 === 0);
  $: rightRow = filtered.filter((a, i) => (i + 2) % 3 === 0);
</script>

<div>
  <div class="sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
    <div>
      {#each leftRow as artwork, i}
        <div class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/each}
    </div>
    <div>
      {#each middleRow as artwork, i}
        <div class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/each}
    </div>
    <div>
      {#each rightRow as artwork, i}
        <div class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/each}
    </div>
  </div>
</div>

<div class="full-width flex bg-white p-4 mx-auto">
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
