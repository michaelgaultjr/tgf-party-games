<script>
    import { layout, metatags, beforeUrlChange } from "@sveltech/routify";
    import { TabsTransition } from "@sveltech/routify/decorators"

    $beforeUrlChange((event, store) => {
        metatags.title = '🎉TGF Party Games 🎮';
        metatags.title = 'Simple & Fun Party Games for everyone! Great for group zoom/video calls';
        return true;
    });
    const games = $layout.children[0].children;
</script>

<slot decorator={TabsTransition} scoped={{ games }} />