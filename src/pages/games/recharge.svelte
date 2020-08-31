<!-- routify:options icon="📱" -->
<!-- routify:options title="Recharge" -->
<!-- routify:options description="TODO: Write Description" -->

<script lang="ts">
    import { writable } from "svelte/store";
    import Emoji from '../../components/Emoji.svelte';
    import RechargeWords from "../../data/recharge-words.json";
    import RandomList from "../../random-list";

    enum GameState {
        Waiting,
        Playing,
        Won,
        Lost
    }

    const letters = [...'qwertyuiopasdfghjklzxcvbnm'];
    const rows = [
        letters.slice(0, 10),   // a..j
        letters.slice(10, 19),  // k..s
        letters.slice(19, 26)   // t..z
    ]
        
    let word = 'Recharge';
    let charge = 3;
    const gameState = writable<GameState>(GameState.Waiting);

    const randomList = new RandomList<string>(RechargeWords);
    const correct = writable(new Array<string>());
    const guessed = writable(new Set<string>())

    function selectLetter(letter: string) {
        if (charge <= 0) return;

        guessed.set($guessed.add(letter));

        if (word.toLowerCase().includes(letter)) {
            correct.set([...$correct, letter]);
            
            if (charge < 2) charge++;

            const sortedUniqueWord = [...new Set(word.toLowerCase().split(' ').join(''))].sort();
            
            if (sortedUniqueWord.toString() == $correct.sort().toString()) {
                win();
            }
        }
        else {
            charge--;
            if (charge <= 0) {
                lose();
            }
        }
    }

    function win() {
        gameState.set(GameState.Won);
    }

    function lose() {
        gameState.set(GameState.Lost);
    }

    function start() {
        charge = 3;
        correct.set(new Array<string>());
        guessed.set(new Set<string>());
        gameState.set(GameState.Playing);
        
        word = randomList.getRandomItem();
        console.log(word);
    }
</script>

<div class="flex-center-col">
    <div class="phone-container flex-center">
        <img class="phone-svg dropshadow" src="/images/phone.svg" alt="Phone">
        <div class="flex-center-col battery-container">
            <img class="battery-image" src="/images/battery_{charge}.svg" alt="Battery">
            {#if $gameState == GameState.Playing || $gameState == GameState.Waiting}
                {(charge / 3 * 100).toFixed(0)}%
            {:else if $gameState == GameState.Won}
                <span>You Win! <Emoji content='🏆' /></span>
            {:else if $gameState == GameState.Lost}
                <span>Game Over <Emoji content='😔' /></span>
            {/if}
        </div>
        <div class="word-bg">
            <div class="word-container">
                {#each word as letter}
                    {#if letter == ' '}
                        <span style="width: 1rem;"></span>
                    {:else}
                        <span class="word-letter">
                            {$correct.includes(letter.toLowerCase()) || $gameState != GameState.Playing ? letter : '_'}
                        </span>
                    {/if}
                {/each}
            </div>
        </div>
        <div class="keyboard-container">
            {#each rows as keys}
                <div class="keyboard-row">
                    {#each keys as key}
                        <button class="keyboard-key" disabled={$guessed.has(key) || $gameState != GameState.Playing } on:click={() => selectLetter(key)}>
                            {key}
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    
    <button 
        class="fancy-btn" 
        class:btn-play={$gameState != GameState.Playing}
        class:btn-stop={$gameState == GameState.Playing}
        disabled={$gameState == GameState.Playing}
        on:click={start}>
        {#if $gameState == GameState.Waiting}
            Play
        {:else if $gameState == GameState.Playing}
            Game In Progress...
        {:else if $gameState == GameState.Won}
            You Win. Play Again
        {:else}
            You Lost. Play Again
        {/if}
    </button>
</div>



<style>
    .phone-svg {
        height: max(25vh, 30rem);
        max-width: 75vh;
    }

    .phone-container {
        position: relative;
        margin-bottom: 2rem;
    }

    .word-bg {
        position: absolute;

        background-color: #c7c7cc;
        padding: .5rem;
        border-radius: .5rem .5rem .0rem .0rem;

        /* Overlay */
        top: 44%;
    }

    .battery-container {
        position: absolute;
        top: 20%;

        filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, .3));
    }

    .battery-image {
        position: relative;
        width: 50%;
    }

    .word-container {      
        display: flex;
        flex-direction: row;
        justify-content: center;

        background-color: #e5e5ea;
        border-radius: .5rem;
        border: solid 2px #aeaeb2;
        width: fit-content;
        box-shadow: 0px 2px rgba(0, 0, 0, .3);

        max-width: 95vw;

        padding: 0rem .5rem;
        user-select: none;
    }

        .word-container > :first-child {
            text-transform: capitalize;
        }

    .word-letter {
        font-size: 2rem;

        color: black;
        margin: .2rem;
    }

    .keyboard-container {
        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: center;

        background-color: #c7c7cc;
        border-radius: .5rem;
        width: fit-content;

        max-width: 95vw;
        margin: 1rem;

        /* Overlay */
        top: 55%;
    }

    .keyboard-row {
        display: flex;
        justify-content: center;
    }

    .keyboard-key {
        padding: .5rem .4rem;
        margin: .35rem;
        width: 2.3rem;
        font-size: 1.5rem;

        text-transform: capitalize;
        text-align: center;

        color: black;
        background-color: white;
        box-shadow: 0px 2px rgba(0, 0, 0, .3);

        border: 0;
        border-radius: .4rem;
        user-select: none;
    }

        .keyboard-key:disabled {
            background-color: #aeaeb9;
        }

        .keyboard-key:not(:active):not(:disabled):hover {
            transform: scale(1.05);
        }
</style>