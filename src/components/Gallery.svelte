<script>
  import { Card, Pagination } from "$comp";
  export let filtered;
  export let loadMore;
  export let total;
</script>

<div class="md:columns-2 lg:columns-3 gap-4">
  {#each filtered as artwork, i}
    <Card {artwork} />
  {/each}
</div>

<Pagination bind:total bind:loadMore />
