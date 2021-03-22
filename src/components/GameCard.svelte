<script>
	import { url } from "@roxi/routify";
	import Emoji from '../components/Emoji.svelte';
	
	export let icon = '🎮';
	export let title = '?';
	export let path = '/';
</script>

<a href={$url(path)}>
	<div class="game-card">
		<h1 class="game-icon dropshadow"><Emoji content={icon} fill /></h1>
		<h1 class="game-title dropshadow">{title}</h1>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: white;
	}
	
	.game-card {
		display: flex;
		position: relative;
		justify-content: center;
		flex-direction: column;
		width: clamp(12rem, 30vw, 15rem);
		height: 20rem;
		
		max-width: 98vw;
		max-height: 100%;
		
		margin: 1rem;
		
		padding: 1.5rem;
		border-radius: 10px;
		
		background: linear-gradient(0deg, rgba(2,0,36,0.5) 10%, rgba(128,128,128,0.5) 90%);
		border: black;
		border-style: solid;
		border-width: 5px;
		transition: all 250ms;
	}
	
	.game-card:hover {
		transform: scale(1.05);
		filter: brightness(115%);
	}
	
	.game-icon {
		font-size: 12rem;
		margin-block-start: 0.2rem;
		margin-block-end: 0.2rem;
		
		user-select: none;
	}
	
	.game-title {
		font-size: clamp(2.5rem, 6vw, 3rem);
		text-align: center;
		
		margin-block-start: 0.5rem;
		margin-block-end: 0.5rem;
		
		user-select: none;
	}
</style>