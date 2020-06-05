<script>
    import Emoji from '../components/Emoji.svelte';
    import GameCard from '../components/GameCard.svelte';

    export let scoped;
</script>
<h1 class="games-header"><Emoji content='🎉' /> Games <Emoji content='🎮' /></h1>
<div class="game-cards-root">
    {#each scoped.games as game}
        <GameCard path={game.path} icon={game.meta.icon} title={game.meta.title} />
    {/each}
</div>

<style>
    .games-header {
        font-size: clamp(2rem, 15vw, 5rem);
        text-align: center;

        margin-block-start: 2rem;
        margin-block-end: .5rem;

        user-select: none;
    }

    .game-cards-root {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        justify-content: center;
    }
</style>