<script>
  import { browser } from "$app/env";
  import { Card, Pagination } from "$comp";
  import { onMount, tick } from "svelte";

  export let filtered;
  let w, el;
  let loading = true;
  let div;

  $: cols = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
  $: c = cols > 1 ? `w-1/${cols}` : "w-full";

  let setHeight = () => {
    let h = div.clientHeight;
    el.style.height = `${(h + 32 * filtered.length) / cols}px`;
    loading = false;
  };

  let t;
  let resize = () => {
    loading = true;
    clearTimeout(t);
    t = setTimeout(() => setHeight(), 50);
  };

  onMount(resize);
</script>

<svelte:window bind:innerWidth={w} on:resize={resize} />

{#if loading}
  <div bind:this={div}>
    {#each filtered as artwork, i}
      <div class={c}>
        <Card {artwork} />
      </div>
    {/each}
  </div>
{/if}

<div
  class="flex align-start flex-col flex-wrap justify-start max-w-full"
  bind:this={el} class:hidden={loading}
>
  {#each filtered as artwork, i}
    <div class={c}>
      <Card {artwork} />
    </div>
  {/each}
</div>
