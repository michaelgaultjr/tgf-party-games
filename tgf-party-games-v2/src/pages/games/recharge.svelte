<!-- routify:options description="Press 'Play' and take turns guessing letters until the word is complete or your run out of charge. You lose charge every time you guess incorrectly. A correct guess will recharge the phone." -->
<script lang="ts">
  import type { Tracker } from "../types";
  import { writable } from "svelte/store";
  import Battery from "../../components/Battery.svelte";
  import Emoji from "../../components/Emoji.svelte";
  import RechargeWords from "../../data/recharge-words.json";
  import RandomList from "../../random-list";

  export let track: Tracker;

  enum GameState {
    Waiting,
    Playing,
    Won,
    Lost,
  }

  const MAX_CHARGE = 5;
  const letters = [..."qwertyuiopasdfghjklzxcvbnm"];
  const rows = [
    letters.slice(0, 10),
    letters.slice(10, 19),
    letters.slice(19, 26),
  ];

  let word = "Recharge";
  let charge = MAX_CHARGE;
  const gameState = writable<GameState>(GameState.Waiting);

  const randomList = new RandomList<string>(RechargeWords);
  const correct = writable(new Array<string>());
  const guessed = writable(new Set<string>());

  function selectLetter(letter: string) {
    if (charge <= 0) return;

    guessed.set($guessed.add(letter));

    if (word.toLowerCase().includes(letter)) {
      correct.set([...$correct, letter]);

      if (charge < MAX_CHARGE) charge++;

      const sortedUniqueWord = [
        ...new Set(word.toLowerCase().split(" ").join("")),
      ].sort();

      if (sortedUniqueWord.toString() == $correct.sort().toString()) {
        win();
      }
    } else {
      charge--;
      if (charge <= 0) {
        lose();
      }
    }
  }

  function win() {
    gameState.set(GameState.Won);
    track('Win');
  }

  function lose() {
    gameState.set(GameState.Lost);
    track('Lose')
  }

  function start() {
    charge = MAX_CHARGE;
    correct.set(new Array<string>());
    guessed.set(new Set<string>());
    gameState.set(GameState.Playing);

    word = randomList.get();
  }
</script>

<!-- routify:options icon="📱" -->
<!-- routify:options title="Recharge" -->
<div class="flex-center-col">
  <div class="phone-container flex-center">
    <img class="phone-svg dropshadow" src="/images/phone.svg" alt="Phone" />
    <div class="flex-center-col battery-container">
      <Battery progress={charge} max={MAX_CHARGE} />
      {#if $gameState == GameState.Playing || $gameState == GameState.Waiting}
        {((charge / MAX_CHARGE) * 100).toFixed(0)}%
      {:else if $gameState == GameState.Won}
        <span>You Win!
          <Emoji content="🏆" /></span>
      {:else if $gameState == GameState.Lost}
        <span>Game Over
          <Emoji content="😔" /></span>
      {/if}
    </div>
    <div class="word-bg">
      <div class="word-container">
        {#each word as letter}
          {#if letter == ' '}
            <span style="width: 1rem;" />
          {:else}
            <span class="word-letter">
              {$correct.includes(letter.toLowerCase()) || $gameState != GameState.Playing ? letter : '_'}
            </span>
          {/if}
        {/each}
      </div>
    </div>
    <div class="keyboard-container">
      {#each rows as keys}
        <div class="keyboard-row">
          {#each keys as key}
            <button
              class="keyboard-key"
              disabled={$guessed.has(key) || $gameState != GameState.Playing}
              on:click={() => selectLetter(key)}
            >
              {key}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <button
    class="fancy-btn"
    class:btn-play={$gameState != GameState.Playing}
    class:btn-stop={$gameState == GameState.Playing}
    disabled={$gameState == GameState.Playing}
    on:click={start}
  >
    {#if $gameState == GameState.Waiting}
      Play
    {:else if $gameState == GameState.Playing}
      Game In Progress...
    {:else}Play Again{/if}
  </button>
</div>

<style>
  .phone-svg {
    height: max(25vh, 30rem);
    max-width: 75vh;
  }

  .phone-container {
    position: relative;
    margin-bottom: 2rem;
  }

  .word-bg {
    position: absolute;

    background-color: #c7c7cc;
    padding: 0.5rem;
    border-radius: 0.5rem 0.5rem 0rem 0rem;

    /* Overlay */
    top: 45.25%;
  }

  .battery-container {
    width: 100%;
    position: absolute;
    top: 20%;

    filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.3));
  }

  .word-container {
    display: flex;
    flex-direction: row;
    justify-content: center;

    background-color: #e5e5ea;
    border-radius: 0.5rem;
    border: solid 2px #aeaeb2;
    width: fit-content;
    box-shadow: 0px 2px rgba(0, 0, 0, 0.3);

    max-width: 95vw;

    padding: 0rem 0.5rem;
    user-select: none;
  }

  .word-container > :first-child {
    text-transform: capitalize;
  }

  .word-letter {
    font-size: 2rem;

    color: black;
    margin: 0.2rem;
  }

  .keyboard-container {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background-color: #c7c7cc;
    border-radius: 0.5rem;
    width: fit-content;

    max-width: 95vw;
    margin: 1rem;

    /* Overlay */
    top: 55%;
  }

  .keyboard-row {
    display: flex;
    justify-content: center;
  }

  .keyboard-key {
    padding: 0.5rem 0.4rem;
    margin: 0.35rem;
    width: 2.3rem;
    font-size: 1.5rem;

    text-transform: capitalize;
    text-align: center;

    color: black;
    background-color: white;
    box-shadow: 0px 2px rgba(0, 0, 0, 0.3);

    border: 0;
    border-radius: 0.4rem;
    user-select: none;
  }

  .keyboard-key:disabled {
    background-color: #aeaeb9;
  }

  .keyboard-key:not(:active):not(:disabled):hover {
    transform: scale(1.05);
  }
</style>
