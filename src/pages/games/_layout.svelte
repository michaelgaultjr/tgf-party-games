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

    const toggleShowing = () => {
        showing = !showing
    }
</script>

<header>
    <a class="logo-header" href="/">
        <h1>🎉 TGF Party Games 🎮</h1>
    </a>
</header>
<main style="position: relative; height: 100%;">
    <slot />
    <div id="how-to-play" style="flex-direction: column; text-align: center;" class="flex-center">
        <h3 class="dropdown" on:click={toggleShowing}>How To Play {$route.meta.title} { showing ? '🔼' : '🔽'}</h3>
        {#if showing}
            <div class="flex-center">
                <p transition:fly={{ duration: 500, y: -20}}>{$route.meta.description}</p>
            </div>
        {/if}
    </div>
</main>

<style>
    .logo-header {
        text-align: center;
        font-size: clamp(.8rem, 4vw, 2rem);
        color: white;
        text-decoration: none;
    }

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
        margin-right: 0px;
        margin-left: 0px;

        text-align: center;
        background-color: rgba(0, 0, 0, 0.75);
        padding: .75rem;
        border-radius: 5px;
        width: 75%;
    }
</style>