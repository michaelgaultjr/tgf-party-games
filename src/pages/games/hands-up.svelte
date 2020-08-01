<!-- routify:options icon="🙌" -->
<!-- routify:options title="Hands Up" -->
<!-- routify:options description="Tell everyone to put up 1, 2, or no hands and press play, anyone who put up the amount of hands that matches the result is out, if it's a tie play again." -->

<script lang="typescript">
	import { fly } from 'svelte/transition';
	import Emoji from '../../components/Emoji.svelte';
	import { wait, random } from '../../utils';

	let rolling = false;
	let selected = null;
	const options = [
		{ text: "Hands Down", icon: '✊' },
		{ text: "Hand Up", icon: '✋' },
		{ text: "Hands Up", icon: '🙌' }
	];

	async function waitAndCycle(count: number = 8, duration: number = 4000): Promise<void> {
		// Generate an offset to appear random
		const offset = random(0, options.length - 1);
		const cycleCount = count + offset;

		for (let i = offset; i < cycleCount; i++) {
			selected = options[i % options.length]
			await wait(duration / cycleCount);
		}
	}

	async function roll(): Promise<void> {
		rolling = true;
		await waitAndCycle();

		let index = random(0, options.length - 1);
		selected = options[index];

		rolling = false;
	}

	const flyParams = { duration: 750, y: -100 }
</script>

<div in:fly={flyParams} class="icon-display dropshadow">
	<div class:rotate={rolling}>
		<Emoji content={selected ? selected.icon : '❓'} fill />
	</div>
</div>

<h1 class="center-text" style="font-size: 2.5rem; margin-block-start: 0.3em;">{selected && !rolling ? selected.text : '?'}</h1>
<div class="flex-center">
	<button class="fancy-btn btn-play" on:click={roll} disabled={rolling}>
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