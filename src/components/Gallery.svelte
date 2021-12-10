<script>
  import { browser } from "$app/env";
  import { Card, Pagination } from "$comp";
  import { onMount, tick } from "svelte";

  export let filtered;
</script>

<div>
  <div class="sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
    <div>
      {#each filtered.filter((x, i) => {
        if (i < 4) {
          return x;
        }
      }) as artwork, i}
        <div class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/each}
    </div>
    <div>
      {#each filtered.filter((x, i) => {
        if (i >= 4 && i < 8) {
          return x;
        }
      }) as artwork, i}
        <div class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/each}
    </div>
    <div>
      {#each filtered.filter((x, i) => {
        if (i >= 8) {
          return x;
        }
      }) as artwork, i}
        <div class="market-gallery w-full mb-20">
          <Card {artwork} />
        </div>
      {/each}
    </div>
  </div>
</div>
