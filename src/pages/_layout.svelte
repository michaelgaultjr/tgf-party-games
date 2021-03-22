<script>
	import { layout, metatags, page } from "@roxi/routify";
	import { TabsTransition } from "@roxi/routify/decorators"
	
	$:{
		metatags.title = $page.meta.title + $page.meta.icon ? `${$page.meta.title} ${$page.meta.icon}` : '🎉 TGF Party Games 🎮';
		metatags.description = $page.meta.description || 'Simple & Fun Party Games for everyone! Great for group zoom/video calls';
	}
	
	const games = $layout.children[0].children;
</script>

<div class="background-stripes" />
<slot decorator={TabsTransition} scoped={{ games }} />