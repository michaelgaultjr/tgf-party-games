<script>
  import { route, focus } from "@sveltech/routify";
  import { fly } from "svelte/transition";
  import Emoji from "../../components/Emoji.svelte";
  import { emoji } from "../../utils.js";

  let showing = false;
</script>

<header>
  <a class="logo-header" href="/">
    <h1 class="dropshadow">
      <Emoji content="🎉" />
      TGF Party Games
      <Emoji content="🎮" />
    </h1>
  </a>
</header>
<main>
  <slot />
</main>
<footer>
  <div
    id="how-to-play"
    style="flex-direction: column; text-align: center; font-size: 1em; margin-top: 2.25rem"
    class="flex-center">
    <h3 class="dropdown dropshadow" on:click={() => (showing = !showing)}>
      How To Play
      {$route.meta.title}
      <Emoji content={showing ? '⬆️' : '⬇️'} />
    </h3>
    {#if showing}
      <div class="flex-center">
        <p use:focus use:emoji transition:fly={{ duration: 500, y: -20 }}>
          {$route.meta.description}
        </p>
      </div>
    {/if}
  </div>
</footer>

<style>
  .logo-header {
    text-align: center;
    font-size: clamp(0.6rem, 4.25vw, 2rem);
    color: white;
    text-decoration: none;
  }

  .dropdown {
    user-select: none;
    color: lightgray;
    cursor: pointer;

    transition: all 250ms ease-in-out;
  }

  .dropdown:hover {
    color: white;
    transform: scale(1.025);
  }

  p {
    margin: 1rem;
    margin-right: 0px;
    margin-left: 0px;

    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
    padding: 0.75rem;
    border-radius: 5px;
    max-width: 75%;
  }

  main {
    position: relative;
    height: auto;
  }
</style>
