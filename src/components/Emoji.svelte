<script lang="ts">
	import twemoji from 'twemoji';

	export let content = '✋';
	export let fill = false;
	
	let params = null;
	if (fill) {
		params = { 
			folder: 'svg',
			ext: '.svg',
			className: 'emoji-fill'
		}
	}
</script>

{@html twemoji.parse(content, params)}
