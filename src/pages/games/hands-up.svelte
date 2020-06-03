<!-- routify:options title="Hands Up 🙌" -->
<!-- routify:options description="Tell everyone to put up 1, 2, or no hands and press play, anyone who put up the amount of hands that matches the result is out, if it's a tie play again." -->

<script>
	import { fly, fade } from 'svelte/transition';
	const wait = ms => new Promise(res => setTimeout(res, ms));
	const rng = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	async function waitAndCycle(count = 8, duration = 4000) {
		// Generate an offset to appear random
		const offset = rng(0, options.length - 1);
		const cycleCount = count + offset;

		for (let i = offset; i < cycleCount; i++) {
			selected = options[i % options.length]
			await wait(duration / cycleCount);
		}
	}

	async function roll() {
		rolling = true;
		await waitAndCycle();

		let index = rng(0, options.length - 1);
		selected = options[index];

		rolling = false;
	}

	let rolling = false;

	let selected = null;
	const options = [
		{ text: "No Hands", icon: '✊' },
		{ text: "1 Hand", icon: '✋' },
		{ text: "2 Hands", icon: '🙌' }
	];
</script>
{#if rolling}
	<div class="flex-center" in:fly={{ duration: 750, y: -100}}>
		<h1 class="icon-display rotate">
			{selected.icon}
		</h1>
	</div>
{:else}
	<h1 class="icon-display center-text">
		{selected ? selected.icon : '❓'}
	</h1>
{/if}
<h1 class="center-text" style="font-size: 2.5rem; margin-block-start: 0.3em;">{selected && !rolling ? selected.text : '?'}</h1>
<div class="flex-center">
	<button class="roll-btn" on:click={roll} disabled={rolling}>
		{#if rolling}
			Selecting...
		{:else}
			Play
		{/if}
	</button>
</div>

<style>
	.roll-btn {
		/* Text Styling */
		font-size: 1.5rem;
		color: #ffffff;

		/* Button Styling */
		background-color: #009d00;
		box-shadow: 2px 2px 5px black;
		border-radius: 3px;
		border: none;
		width: 15rem;
		
		user-select: none;
		transition: all .2s ease-in-out;
	}

		.roll-btn:not(:disabled):hover {
			transform: scale(1.025);
			filter: brightness(115%);
		}

		.roll-btn:disabled {
			filter: brightness(75%);
			transform: scale(0.90);
		}

	.icon-display {
		font-size: 12rem;
		user-select: none;

		margin-block-start: 8rem;
    	margin-block-end: 8rem;
	}

	/* Animations */
	.rotate {
		animation: rotation 1s infinite linear;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
</style>