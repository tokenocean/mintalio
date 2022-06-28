<script>
  import { Card } from "$comp";
  export let filtered;
</script>

<div class="md:columns-2 lg:columns-3 gap-4">
  {#each filtered as artwork, i}
    <Card {artwork} />
  {/each}
</div>
