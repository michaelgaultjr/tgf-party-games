<!-- routify:options icon="🤳 " -->
<!-- routify:options title="Bring It" -->
<!-- routify:options description="Press play and have everyone show the randomly selected item on the screen, whoever shows the item first wins." -->

<script lang="typescript">
    import ItemList from '../../data/bring-it-items.json';
    import RandomList from '../../random-list';
    import Emoji from '../../components/Emoji.svelte';
    import { wait } from '../../utils';
    import { fly } from 'svelte/transition';

    const list = new RandomList<string>(ItemList);
    let item: string = '...';
    let selecting: boolean = false;

    async function nextItem() {
        selecting = true;
        await wait(2000);

        item = list.getRandomItem()

        selecting = false;
    }

    const flyParams = { duration: 750, y: -75 }
</script>

<h1 class="center-text dropshadow">Bring a...</h1>

{#if selecting}
    <div in:fly={flyParams} class="icon-display dropshadow">
        <div class="rotate">
            <Emoji content='❓' fill />
        </div>
    </div>
{:else}
    <span in:fly={flyParams} class="item-display dropshadow">{item}</span>
{/if}

{#if !selecting}
    <div class="flex-center">
        <button class="fancy-btn btn-play" on:click={nextItem}>Play</button>
    </div>
{/if}

<style>
    .icon-display {
		/* Position & Sizing */
		--size: 16rem;
		position: relative;
		max-width: var(--size);
		max-height: var(--size);

		margin-block-start: 2rem;
		margin-block-end: 2 rem;

		/* Center */
		left: 50%;
		transform: translateX(-50%);
	}

    .item-display {
        margin: 2rem;
        font-size: 6rem;

        display: block;
        text-align: center;
    }

    h1 {
        font-size: 3rem;
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
</style>