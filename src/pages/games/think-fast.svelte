<!-- Route Meta Data -->
<!-- routify:options icon="⚡" -->
<!-- routify:options title="Think Fast" -->
<!-- routify:options description="Select a player to play and then press the 🎲 or Play button. The player has 5 seconds to name 3 of the randomly selected item, if they successfully the items, stop the timer, record the time and move onto the next player, if times runs out, they are out. Whoever has the highest time by the end wins." -->

<script>
    import { fly } from 'svelte/transition';
    import ProgressRing from '../../components/ProgessRing.svelte';
    import numeral from 'numeral';
    import { wait, random } from '../../utils.js';

    let playingIntro = false;
    let inProgress = false;
    let value = 5;
    let display = '🎲';
    
    let remaining = 0;
    let countdown = null;

    const timer = () => {
        if (remaining <= 0)
        {
            display = "🔁";
            stop();
            return;
        }
        remaining--;
        value = remaining / 100;
        display = numeral(value).format('00.00').replace('.', ':');
    }

    const stop = () => {
        clearInterval(countdown);
        inProgress = false;
    }

    const intro = async () => {
        stage = 0;
        await wait(1000);
        stage = 1;
        await wait(1000);
        stage = 2;
    }
    
    const toggleTimer = async () => {
        if (playingIntro) return;

        if (!inProgress) {
            playingIntro = true;
            await intro();
            playingIntro = false;

            selected = options[random(0, options.length - 1)];

            await wait(500);

            remaining = 5 * 100;
            countdown = setInterval(timer, 10);
            inProgress = true;
        }
        else {
            stop();
        }
    }

    let stage = null;

    let selected = null;
    const options = [    
        'Boy Names',
        'Girl Names',
        'World Wonders',
        'Theme Parks',
        'State Capitals',
        'Continents', 
        'Breakfast Foods',
        'Fast Fodd Resturants',
        'Fruits',
        'Vegetables',
        'Deserts',
        'Candies',
        'Hard Candies',
        'Sodas',
        'Cereals',
        'Chip Brands',
        'Condiments',
        'Red Fruits',
        'Flowers',
        'Board Games',
        'Land Animals',
        'Sea Creatures',
        'Birds',
        'Holidays',
        'Months of the year',
        'Rooms in a House',
        'Celebrities',
        'US Presidents',
        'Movies',
        'Disney Movies',
        'Marvel Movies',
        'TV Shows',
        'Cartoons',
        'TV Channels',
        'Songs',
        'Singers',
        'Actors',
        'Video Games',
        'Marvel Superheros',
        'DC Superheros',
        'Disney Villans',
        'Disney Princesses',
        'Marvel Villans',
        'DC Villans',
        'Retail Stores',
        'Pizza Places',
        'Colors',
        'Kitchen Utensils',
        'Elements',
        'Bugs',
        'Prime Numbers',
        'Sports',
        'Football Teams',
        'Basket Ball Teams',
        'Base Ball Teams'
    ]
</script>

{#if stage == null}
    <h1 in:fly={{ duration: 1000, y: -30 }} class="center-text">
        Press the 🎲 or Play to Start!
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
    <ProgressRing max={5} bind:value size={400} stroke={16}>
        <tspan class="progress-circle-text" class:text-smaller={display.length > 8}>{display}</tspan>
    </ProgressRing>
</div>

<div class="flex-center">
	<button class="fancy-btn" disabled={playingIntro} class:play-btn={!inProgress} class:stop-btn={inProgress} on:click={toggleTimer}>
		{#if inProgress}
			Stop
		{:else}
			Play
		{/if}
	</button>
</div>

<style>
    .text-smaller {
        font-size: 3.25rem!important;
    }

    .progress-circle {
        max-width: 400px;
        margin-top: 5rem;
        margin-bottom: 5rem; 
        user-select: none;

        left: 50%;
		position: inherit;
		transform: translateX(-50%);
    }

    .progress-circle-text {
        transition: all 250ms ease-in-out;
    }

     @media (pointer: fine) {
        .progress-circle-text:hover {
            font-size: 1.1em;
            fill: white;
        }
    }

    .progress-circle-text:active {
        font-size: 1.1em;
        fill: white;
    }
    

    @media (max-width: 768px) { 
		.progress-circle {
            margin-top: 2rem;
            margin-bottom: 2rem;
        }
	}
</style>

