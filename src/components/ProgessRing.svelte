<script lang="ts">
	import { beforeUpdate } from 'svelte';
	import { lerpHexColor } from '../utils';

	export let stroke = 4;
	export let size = 120;
	export let max = 100;
	export let value = max;
	export let percentage: number = 0;

	let strokeOffset = 30;
	
	let percent: number;
	let colorHex: string;

	const radius = size / 2;
	const diameter = (radius * 2) + stroke;
	const circumference = radius * 2 * Math.PI;
	
	beforeUpdate(() => {
		percent = value / max;
		strokeOffset = circumference - percent * circumference;

		colorHex = lerpHexColor(0xff0000, 0x00ff00, percent);

		percentage = Math.round(percent * 100);
	});
</script>

<div style="max-width: {diameter}px; max-height: {diameter}px; width: 100%; height: 100%; margin: 3rem">
	<svg
		class="progress-ring"
		viewBox="0 0 {diameter} {diameter}">
		<circle
			class="progress-ring__circle"
			style="stroke-opacity: .5"
			stroke="black"
			stroke-width={stroke}
			fill="transparent"
			r={radius}
			cx="50%"
			cy="50%" />

	<circle
		class="progress-ring__circle outer"
		style="stroke-dasharray: {circumference} {circumference}; stroke-dashoffset: {strokeOffset}"
		stroke="#{colorHex}"
		stroke-width={stroke}
		fill="transparent"
		r={radius}
		cx="50%"
		cy="50%" />
	</svg>

	<div class="progress-ring-content center">
		<slot />
	</div>
</div>

<style>
	.progress-ring__circle {
        transform: rotate(-90deg);
		transform-origin: 50% 50%;
    }

	.progress-ring-content {
        position: absolute;
        padding: 0px;
		max-width: 75%;
		
        user-select: none;
    }

	@media (max-width: 425px) { 
		.progress-ring-content {
            margin-top: 2rem;
            margin-bottom: 2rem;
        }
	}
</style>