<script lang="ts">
    import { lerpHexColor } from '../utils';

    const MAX_WIDTH = 48;

    export let max = 100;
    export let progress = 40;

    let width: number;
    let color: string;
    $: {
        let percent = progress / max;
        width = percent * MAX_WIDTH;
        color = lerpHexColor(0xd90000, 0x00d933, percent);
    }
</script>

<div style="position: relative; width: 60%;">
    <svg id="Layer_1" data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 30">
        <rect class="cls-2" fill="#999" width="52" height="30" rx="2"/> 
        <path class="cls-2" fill="#999" d="M314,200h-2V188h2a2,2,0,0,1,2,2v8A2,2,0,0,1,314,200Z" transform="translate(-258 -179)"/> <!-- Battery Positive -->
        <rect class="cls-3" fill="#34393f" x="2" y="2" width="48" height="26" rx="1"/> <!-- Color Background -->
        <rect class="cls-4" fill="#{color}" x="2" y="2" width="{width}" height="26" rx="1"/> <!-- Color Foreground -->
    </svg>
</div>

