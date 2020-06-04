<script>
    import { layout, metatags, beforeUrlChange } from "@sveltech/routify";

    $beforeUrlChange((event, store) => {
        metatags.title = "TGF Party Games";
        return true;
    });
    const games = $layout.children[0].children;
</script>

<slot scoped={{games: games}} />