<script>
  import { isActive, url, layout, metatags, beforeUrlChange } from "@sveltech/routify";

    $beforeUrlChange((event, store) => {
        metatags.title = "TGF Party Games";
        return true;
    });
</script>

<nav>
    <a class="brand" href="/">
        🎉
    </a>
    <div class="items">
        {#each $layout.children[0].children as { path, title }}
            <a href={$url(path)}>{title}</a>
        {/each}
    </div>
</nav>
<slot />

<style>
    nav {
        margin: 0px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: .75rem;

        display: inline-flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }

    .brand {
        text-decoration: none;
        font-size: 1.5rem;
    }

    .items a {
        margin-left: .5rem;
        color: lightgray;

        transition: all .2s ease-in-out;
    }

        .items a:hover {
            color: white;
            text-decoration: none;
            transform: scale(1.025);
        }
</style>
