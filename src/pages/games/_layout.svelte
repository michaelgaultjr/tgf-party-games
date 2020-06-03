<script>
    import { route, metatags, beforeUrlChange  } from '@sveltech/routify';
    import { fly } from 'svelte/transition';

    $: if ($route.meta.title) {
        metatags.title = $route.meta.title;
    }
    metatags.description = `How To Play: ${$route.meta.description}`;

    let showing = false;

    $beforeUrlChange((event, store) => {
        showing = false;
        return true;
    });
</script>

<main style="position: relative; height: 100%;">
    <slot />
    <div id="how-to-play">
        <div class="flex-center">
            <h3 class="dropdown" on:click={() => showing = !showing}>How To Play {$route.meta.title} { showing ? '🔼' : '🔽'}</h3>
        </div>
        {#if showing}
            <div class="flex-center">
                <p transition:fly={{ duration: 500, y: -20}}>{$route.meta.description}</p>
            </div>
        {/if}
    </div>
</main>

<style>
    .dropdown {
        user-select: none;
        color: lightgray;
        cursor: pointer;

        transition: all 250ms ease-in-out;
    }

        .dropdown:hover {
            color: white;
            transform: scale(1.025);
        }

    p {
        margin: 1rem;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.75);
        padding: .75rem;
        border-radius: 5px;
    }
</style>