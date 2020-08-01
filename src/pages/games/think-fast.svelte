<!-- routify:options icon="⚡" -->
<!-- routify:options title="Think Fast" -->
<!-- routify:options description="Select a player to play and then press the 🎲 or Play button. The player has 5 seconds to name 3 of the randomly selected item, if they successfully name the items, stop the timer by pressing countdown or Stop button, then record the time and move onto the next player, if times runs out, they are out. Whoever has the highest time by the end wins." -->

<script lang="typescript">
    import { fly } from 'svelte/transition';
    import ProgressRing from '../../components/ProgessRing.svelte';
    import Emoji from '../../components/Emoji.svelte';
    import numeral from 'numeral';
    import { wait, Stopwatch } from '../../utils';
    import RandomList from '../../random-list';
    import WordList from '../../data/think-fast-words.json';

    const randomListOptions = new RandomList<string>(WordList);

    // Intro Variables
    let introPlaying: boolean = false;
    let introStage: number = null;

    // Game State Variables
    let inProgress: boolean = false;
    let selectedItem: string = null;

    let circleText: string = '🎲'; // Progress Circle Text

    const timer = new Stopwatch(500, (t: number) => {
        timer.ticks = timer.ticks;
        const remaining = t / 100;

        circleText = `${numeral(remaining).format('0.00')}s`;
    });

    async function intro() {
        introPlaying = true;
        for (introStage = 0; introStage < 2; introStage++) await wait(1000);
        introPlaying = false;
    }
    
    async function toggleTimer() {
        if (introPlaying) return;

        if (timer.active) {
            timer.stop();
            return;
        }

        await intro();
        selectedItem = randomListOptions.getRandomItem();
        await wait(500);
        timer.start();
    }

    const flyParams = { duration: 1000, y: -30 }
</script>

{#if introStage == null}
    <h1 in:fly={flyParams} class="center-text dropshadow">
        Press the <Emoji content='🎲' /> or Play to start!
    </h1>
{:else if introStage == 0}
    <h1 in:fly={flyParams} class="center-text dropshadow">
        Ready...
    </h1>
{:else if introStage == 1}
    <h1 in:fly={flyParams} class="center-text dropshadow">
        Set...
    </h1>
{:else}
    <h1 in:fly={flyParams} class="center-text dropshadow">
        Go! Name 3 {selectedItem ? selectedItem : '??'}!
    </h1>
{/if}

<div class="flex-center" on:click={toggleTimer}>
    <ProgressRing max={timer.totalTicks} bind:value={timer.ticks} size={350} stroke={24}>
        <div class="progress-content-effects">
            <span class="dropshadow" style="font-size: 6rem;">
                <Emoji content={circleText} fill />
            </span>
        </div>
    </ProgressRing>
</div>

<div class="flex-center">
	<button class="fancy-btn" disabled={introPlaying} class:btn-play={!inProgress} class:btn-stop={inProgress} on:click={toggleTimer}>
		{inProgress ? 'Stop' : 'Play'}
	</button>
</div>

<style>
    .progress-content-effects {
        transition: all 250ms ease-in-out;
    }

    .progress-content-effects:active {
        font-size: 1.1em;
        filter: brightness(90%);
		transform: scale(.95);
    }

    @media (pointer: fine) {
        .progress-content-effects:not(:active):hover {
            transform: scale(1.1);
			filter: brightness(115%);
        }
    }
</style>