<script>
  import { Sidebar, Navbar, Dialog, Footer, Snack, Head } from "$comp";
  import { onMount } from "svelte";

  let open = false;
  let y;

</script>

<svelte:window bind:scrollY={y} />

<Head />
<Snack />

<Sidebar bind:open />
<div class={y > 50 ? "sticky" : ""}>
  <Navbar bind:sidebar={open} />
</div>
<Dialog />

<main>
  <div class="mx-auto min-h-screen">
    <slot />
  </div>
</main>

<Footer />

<style global src="../../main.css">
</style>
