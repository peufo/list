<script lang="ts">
  import { onMount } from 'svelte'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/vs.css'
  import hljs_svelte from 'highlightjs-svelte'

  import Basic from './example/Basic.svelte'
  import basicRaw from './example/Basic.svelte?raw'
  import Advanced from './example/Advanced.svelte'
  import AdvancedRaw from './example/Advanced.svelte?raw'

  hljs_svelte(hljs)
</script>

<h3>Liste éditable example</h3>

<article>
  <h4>Basic</h4>
  <div class="row">
    <div class="code">
      <pre>{@html hljs.highlight('svelte', basicRaw).value}</pre>
    </div>
    <Basic />
  </div>
</article>

<article>
  <h4>Advanced</h4>
  <div class="row">
    <div class="code">
      <pre>{@html hljs.highlight('svelte', AdvancedRaw).value}</pre>
    </div>
    <Advanced />
  </div>
</article>

<style>
  :global(body) {
    font-family: helvetica;
  }
  .code > pre {
    font-family: Liberation Mono, monospace;
  }
  .code {
    background: #f8f8f8;
    padding: 1em;
    border-radius: 0.5em;
  }

  article {
    margin-top: 2em;
  }
  .row {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
</style>
