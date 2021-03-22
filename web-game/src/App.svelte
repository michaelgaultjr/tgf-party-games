<script>
	import { fly, fade } from 'svelte/transition';
	import { Random } from "random-js";
	const random = new Random();
	const wait = ms => new Promise(res => setTimeout(res, ms));

	async function waitAndCycle(count = 8, duration = 4000) {
		// Generate an offset to appear random
		let offset = random.integer(0, options.length)
		let cycleCount = count + offset;

		for (let i = offset; i < cycleCount; i++) {
			selected = options[i % options.length]
			await wait(duration / cycleCount);
		}
	}

	async function roll() {
		rolling = true;
		await waitAndCycle();

		let index = random.integer(0, options.length);
		selected = options[index];

		rolling = false;
	}

	let rolling = false;

	let selected = null;
	const options = [
		'👇',
		'✋',
		'🙌'
	];

</script>

<main class="center">
	{#if rolling}
		<div in:fly={{ duration: 750, y: -100}}>
			<h1 class="icon-display anim-rotate">
				{selected}
			</h1>
		</div>
	{:else}
		{#if selected}
			<h1 class="icon-display">
				{selected}
			</h1>
		{:else}
			<h1 style="text-align: center">No Hands = 👇</h1>
			<h1 style="text-align: center">1 Hand = ✋</h1>
			<h1 style="text-align: center">2 Hands = 🙌</h1>
			<h1 style="text-align: center">Match = Out</h1>
		{/if}
	{/if}
	<div class="flex-center">
		<button class="roll-btn" on:click={roll} disabled={rolling}>
			{#if rolling}
				Selecting...
			{:else}
				Start
			{/if}
		</button>
	</div>
</main>