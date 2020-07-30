<!-- routify:options icon="⚡" -->
<!-- routify:options title="Think Fast" -->
<!-- routify:options description="Select a player to play and then press the 🎲 or Play button. The player has 5 seconds to name 3 of the randomly selected item, if they successfully name the items, stop the timer by pressing countdown or Stop button, then record the time and move onto the next player, if times runs out, they are out. Whoever has the highest time by the end wins." -->

<script>
    import { fly } from 'svelte/transition';
    import ProgressRing from '../../components/ProgessRing.svelte';
    import Emoji from '../../components/Emoji.svelte';
    import numeral from 'numeral';
    import { wait, random } from '../../utils.js';
    import RandomList from '../../random-list.ts';
    import WordList from '../../data/think-fast-words.json';

    // let options = null;
    // const resetOptions = () => {
    //     options = [];
    //     WordList.forEach(word => {
    //         options.push({ value: word, used: false })
    //     });
    // }
    // resetOptions();

    const randomListOptions = new RandomList(WordList);

    // Intro Variables
    let playingIntro = false;
    let stage = null;

    // Game State Variables
    let inProgress = false;
    let selected = null;

    let value = 5; // Progress Circle Value
    let display = '🎲'; // Progress Circle Text
    
    let remaining = 0;
    let countdown = null;

    const startTimer = (seconds = 5) => {
        remaining = seconds * 100;
        countdown = setInterval(timer, 10);
        inProgress = true;
    }

    const stopTimer = () => {
        clearInterval(countdown);
        inProgress = false;
    }

    const timer = () => {
        if (remaining <= 0)
        {
            display = '🔁';
            stopTimer();
            return;
        }
        remaining--;
        value = remaining / 100;
        display = `${numeral(value).format('0.00')}s`;
    }

    const intro = async () => {
        playingIntro = true;
        for (stage = 0; stage < 2; stage++) await wait(1000);
        playingIntro = false;
    }
    
    const toggleTimer = async () => {
        if (playingIntro) return;

        if (!inProgress) {
            await intro();

            selected = randomListOptions.getRandomItem();

            await wait(500);
            startTimer();
        }
        else {
            stopTimer();
        }
    }
</script>

{#if stage == null}
    <h1 in:fly={{ duration: 1000, y: -30 }} class="center-text">
        Press the <Emoji content='🎲' /> or Play to start!
    </h1>
{:else if stage == 0}
    <h1 in:fly={{ duration: 1000, y: -30 }} class="center-text">
        Ready...
    </h1>
{:else if stage == 1}
    <h1 in:fly={{ duration: 1000, y: -30 }} class="center-text">
        Set...
    </h1>
{:else}
    <h1 in:fly={{ duration: 1000, y: -30 }} class="center-text">
        Go! Name 3 {selected ? selected : '??'}!
    </h1>
{/if}

<div class="flex-center progress-circle" on:click={toggleTimer}>
    <ProgressRing max={5} bind:value size={400} stroke={24}>
        <span class="progress-content">
            <Emoji content={display} fill />
        </span>
    </ProgressRing>
</div>

<div class="flex-center">
	<button class="fancy-btn" disabled={playingIntro} class:btn-play={!inProgress} class:btn-stop={inProgress} on:click={toggleTimer}>
		{inProgress ? 'Stop' : 'Play'}
	</button>
</div>

<style>
    .progress-circle {
        max-width: 400px;
        margin-top: 5rem;
        margin-bottom: 5rem; 
        user-select: none;

        left: 50%;
		position: relative;
		transform: translateX(-50%);
    }

    .progress-content {
        font-size: 6rem;
        filter: drop-shadow(2px 4px 6px black);
    }

    @media (max-width: 768px) { 
		.progress-circle {
            margin-top: 2rem;
            margin-bottom: 2rem;
        }
	}
</style>