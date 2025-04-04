<script lang="ts">
  import twemoji from "twemoji";

  export let content = "✋";
  export let fill = false;

  let params = null;
  if (fill) {
    params = {
      folder: "svg",
      ext: ".svg",
      className: "emoji-fill",
      base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
    };
  }
</script>

{@html twemoji.parse(content, params)}
