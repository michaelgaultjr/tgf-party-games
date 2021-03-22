<!-- routify:options description="Select a player to play and then press the 🎲 or Play button. The player has 30 seconds to name 3 of the randomly selected item, if they successfully name the items, stop the timer by pressing countdown or Stop button, then record the time and move onto the next player, if times runs out, they are out. Whoever has the highest time by the end wins." -->
<script lang="ts">
  import ProgressRing from "../../components/ProgessRing.svelte";
  import RandomList from "../../random-list";
  import numeral from "numeral";
  import { Stopwatch, track } from "../../utils";

  const timer = new Stopwatch(
    3000,
    (t: number) => {
      timer.ticks = timer.ticks;
      timer.active = timer.active;

      const ticks = t / 100;

      timeDisplay = numeral(ticks).format("0.0") + "s";
    },
    () => {
      timer.active = timer.active;
    }
  );

  const randomList = new RandomList<string>([..."abcdefghijklmnopqrstuvwxyz"]);

  let timeDisplay: string;
  let selected = "?";
  async function toggle() {
    timer.active = timer.active;

    if (timer.active) {
      timer.stop();
      track(`${(timer.ticks / 100).toFixed()} seconds`)
      return;
    }

    timer.start();
    selected = randomList.get();
  }
</script>

<!-- routify:options icon="💬" -->
<!-- routify:options title="Name It" -->
<div class="flex-center-col">
  <span class="sub-header dropshadow">
    Name a Person, Place, and Thing that begin with...
  </span>

  <ProgressRing
    max={timer.totalTicks}
    bind:value={timer.ticks}
    size={350}
    stroke={24}>
    <div class="progress-content dropshadow">
      <div class="flex-center-col">
        <h1 class="uppercase">{selected}</h1>
        <span class="time-display">{timeDisplay ? timeDisplay : ""}</span>
      </div>
    </div>
  </ProgressRing>

  <button
    class="fancy-btn"
    class:btn-play={!timer.active}
    class:btn-stop={timer.active}
    on:click={toggle}>
    {timer.active ? "Stop" : "Play"}
  </button>
</div>

<style>
  .uppercase {
    font-size: 5rem;
    text-transform: capitalize;

    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .time-display {
    font-size: 1.5rem;
  }

  .sub-header {
    font-size: 1.75rem;
    text-align: center;
    max-width: 85vw;
  }
</style>
