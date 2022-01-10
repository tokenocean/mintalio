<script>
  import { browser } from "$app/env";
  import { Card, Pagination } from "$comp";
  import { onMount, tick } from "svelte";

  export let filtered = [];

  let chunks;
  let leftRow;
  let middleRow;
  let rightRow;

  function splitToChunks() {
    chunks = [];
    leftRow = [];
    middleRow = [];
    rightRow = [];
    for (let i = 0; i < Math.ceil(filtered.length / 24); i++) {
      chunks.push(
        filtered.filter((x, j) => {
          if (j >= i * 24 && j < (i + 1) * 24) {
            return x;
          }
        })
      );
    }
    for (let i = 0; i < chunks.length; i++) {
      leftRow = [
        ...leftRow,
        ...chunks[i].filter((x, j) => {
          if (j < 8) {
            return x;
          }
        }),
      ];
      middleRow = [
        ...middleRow,
        ...chunks[i].filter((x, j) => {
          if (j >= 8 && j < 16) {
            return x;
          }
        }),
      ];
      rightRow = [
        ...rightRow,
        ...chunks[i].filter((x, j) => {
          if (j >= 16) {
            return x;
          }
        }),
      ];
    }
  }
  $: {
    filtered;
    splitToChunks();
  }
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
