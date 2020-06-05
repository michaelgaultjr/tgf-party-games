<script>
	import { onMount, beforeUpdate } from 'svelte';
	import { lerpHexColor } from '../utils.js';

    export let stroke = 4;
	export let size = 120;
	export let max = 100;
    export let value = max;
    export let percentage

    let percent = 0;
    let radius = 0;
    let circumference = 0;
    let offset = 30;

	let colorHex = 0x00ff00;

	onMount(() => {
		radius = (size / 2) - (stroke * 2);
		circumference = radius * 2 * Math.PI;
	});

	beforeUpdate(() => {
		percent = value / max;
		offset = circumference - percent * circumference;

		colorHex = lerpHexColor(0xff0000, 0x00ff00, percent);

		percentage = Math.round(percent * 100);
    });
</script>
<svg
	class="progress-ring"
	width={size}
	height={size}
	viewBox="0 0 {size} {size}">
	<circle
    	class="progress-ring__circle"
		style="stroke-opacity: .5"
		stroke="black"
		stroke-width={stroke}
		fill="transparent"
		r={radius}
		cx={size / 2}
		cy={size / 2} />

	<filter id="dropshadow" height="130%">
		<feGaussianBlur in="SourceAlpha" stdDeviation="5"/> <!-- stdDeviation is how much to blur -->
		<feOffset dx="2" dy="2" result="offsetblur"/> <!-- how much to offset -->
		<feComponentTransfer>
			<feFuncA type="linear" slope="1.25"/> <!-- slope is the opacity of the shadow -->
		</feComponentTransfer>
		<feMerge> 
			<feMergeNode/> <!-- this contains the offset blurred image -->
			<feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
		</feMerge>
	</filter>
  <circle
    class="progress-ring__circle outer"
    style="stroke-dasharray: {circumference} {circumference}; stroke-dashoffset: {offset}"
	stroke="#{colorHex}"
    stroke-width={stroke}
    fill="transparent"
    r={radius}
    cx={size / 2}
    cy={size / 2} />
	<text 
		x="50%" 
		y="50%"
		style="filter:url(#dropshadow)"
		text-anchor="middle"
		font-size="4.75rem"
		fill="lightgray"
		dy="7.5%">
  	</text>
</svg>
<div class="progress-ring-content">
	<slot />
</div>
<style>
	.progress-ring__circle {
        transform: rotate(-90deg);
		transform-origin: 50% 50%;
    }

	.progress-ring-content {
        position: fixed;
        padding: 0px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
		max-width: 75%;

        transition: all 250ms ease-in-out;
    }

     @media (pointer: fine) {
        .progress-ring-content:hover {
            transform: scale(1.1) translate(-45%, -45%);
			filter: brightness(115%);
        }
    }

    .progress-ring-content:active {
        font-size: 1.1em;
        filter: brightness(90%);
		transform: scale(.95) translate(-52%, -52%);
    }
</style>