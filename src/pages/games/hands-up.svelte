<!-- routify:options icon="🙌" -->
<!-- routify:options title="Hands Up" -->
<!-- routify:options description="Tell everyone to put up 1, 2, or no hands and press play, anyone who put up the amount of hands that matches the result is out, if it's a tie play again." -->

<script>
	import { fly } from 'svelte/transition';
	import Emoji from '../../components/Emoji.svelte';
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
		{ text: "Hands Down", icon: '✊' },
		{ text: "Hand Up", icon: '✋' },
		{ text: "Hands Up", icon: '🙌' }
	];
</script>

<div in:fly={{ duration: 750, y: -100 }} class="icon-display">
	<div class:rotate={rolling}>
		<Emoji content={selected ? selected.icon : '❓'} fill />
	</div>
</div>

<h1 class="center-text" style="font-size: 2.5rem; margin-block-start: 0.3em;">{selected && !rolling ? selected.text : '?'}</h1>
<div class="flex-center">
	<button class="fancy-btn play-btn" on:click={roll} disabled={rolling}>
		{rolling ? 'Selecting...' : 'Play'}
	</button>
</div>

<style>
	.icon-display {
		/* Position & Sizing */
		--size: 16rem;
		position: relative;
		max-width: var(--size);
		max-height: var(--size);
		height: var(--size);

		margin-block-start: 6rem;
		margin-block-end: 6rem;

		/* Center */
		left: 50%;
		transform: translateX(-50%);
	}

	/* Animations */
	.rotate {
		position: relative;
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
			margin-block-start: 3rem;
    		margin-block-end: 5rem;
		}
	}
</style>