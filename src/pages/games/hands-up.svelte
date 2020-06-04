<!-- routify:options icon="🙌" -->
<!-- routify:options title="Hands Up" -->
<!-- routify:options description="Tell everyone to put up 1, 2, or no hands and press play, anyone who put up the amount of hands that matches the result is out, if it's a tie play again." -->

<script>
	import { fly, fade } from 'svelte/transition';
	import { wait, random } from '../../utils.js';

	async function waitAndCycle(count = 8, duration = 4000) {
		// Generate an offset to appear random
		const offset = random(0, options.length - 1);
		const cycleCount = count + offset;

		for (let i = offset; i < cycleCount; i++) {
			selected = options[i % options.length]
			await wait(duration / cycleCount);
		}
	}

	async function roll() {
		rolling = true;
		await waitAndCycle();

		let index = random(0, options.length - 1);
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
	<!-- The rotating icon is fixed, and this acts as the spacer to stop the page from sligthly shifting when the icon is rotating -->
	<h1 class="icon-display hidden">✋</h1>
{:else}
	<h1 in:fly={{ duration: 750, y: -100 }} class="icon-display center-text">
		{selected ? selected.icon : '❓'}
	</h1>
{/if}
<h1 class="center-text" style="font-size: 2.5rem; margin-block-start: 0.3em;">{selected && !rolling ? selected.text : '?'}</h1>
<div class="flex-center">
	<button class="fancy-btn play-btn" on:click={roll} disabled={rolling}>
		{#if rolling}
			Selecting...
		{:else}
			Play
		{/if}
	</button>
</div>

<style>
	.icon-display {
		position: relative;
		font-size: 12rem;
		user-select: none;

		margin-block-start: 8rem;
    	margin-block-end: 8rem;
	}

	.hidden {
		opacity: 0;
	}

	/* Animations */
	.rotate {
		position: fixed;
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

	@media (max-width: 768px) { 
		.icon-display {
			margin-block-start: 5rem;
    		margin-block-end: 5rem;
		}
	}
</style>