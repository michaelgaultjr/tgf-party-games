<script>
    import { url, layout } from "@sveltech/routify";
    export let scoped;
    console.log(scoped);
</script>
<h1 class="games-header">🎉 Games 🎮</h1>
<div class="game-card-root">
    {#each scoped.games as game}
        <a href={$url(game.path)}>
            <div class="games-card">
                <h1 class="icon-header">{game.meta.icon}</h1>
                <h1 class="game-title">{game.meta.title}</h1>
            </div>
        </a>
    {/each}
</div>


<style>
    .games-header {
        font-size: clamp(2rem, 10vw, 5rem);
        text-align: center;

        margin-block-start: 2rem;
        margin-block-end: .5rem;
    }

    .game-card-root {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        justify-content: center;
    }

    .game-card-root a {
        text-decoration: none;
        color: white;
    }

    .games-card {
        display: flex;
        position: relative;
        justify-content: center;
        flex-direction: column;
        width: auto;
        height: auto;

        max-width: 95vw;

        margin: 1rem;

        padding: 1.5rem;
        border-radius: 10px;

        background: rgba(0, 0, 0, 0.5);
        transition: all 250ms;
    }

        .games-card:hover {
            transform: scale(1.05);
            filter: brightness(115%);
            background: rgba(0, 0, 0, 0.5);
        }

    .icon-header {
        font-size: 12rem;
        margin-block-start: 0.2rem;
        margin-block-end: 0.2rem;

        user-select: none;
    }

    .game-title {
        font-size: 3rem;
        text-align: center;

        margin-block-start: 0.5rem;
        margin-block-end: 0.5rem;

        user-select: none;
    }
</style>