<script>
  import Fa from "svelte-fa";
  import { faSearch } from "@fortawesome/free-solid-svg-icons";
  import Hamburger from "./Hamburger.svelte";
  import Menu from "./Menu.svelte";
  import Popup from "./Popup.svelte";
  import { get } from "svelte/store";
  import { popup } from "$lib/store";
  import branding from "$lib/branding";

  export let sidebar = false;

  const popupData = get(popup);

</script>

<style>
  header {
    padding-top: 20px;
  }

  .hambuger {
    display: none;
  }

  .mobileSearch {
    display: none;
  }

  @media only screen and (max-width: 1023px) {
    header {
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .hambuger {
      display: block;
    }

    .mobileSearch {
      display: block;
      font-size: 20px;
    }

    nav {
      z-index: 100;
    }
  }

</style>

{#if popupData}
  <Popup text={popupData.text} dismissible={popupData.dismissible} />
{/if}
<header
  class="flex container mx-auto justify-between px-4 py-4 items-center text-gray-600">
  <nav class="flex hambuger">
    <Hamburger bind:open={sidebar} />
  </nav>
  <div>
    <a href="/">
      <img src={branding.meta.logo.header.path}  alt="logo" class={branding.meta.logo.header.class} /></a>
  </div>
  <a class="mobileSearch" href="/market">
    <Fa icon={faSearch} />
  </a>
  <nav class="hidden text-bold lg:block">
    <Menu />
  </nav>
</header>
