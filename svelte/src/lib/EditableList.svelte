<script lang="ts">
  import { onMount } from 'svelte'

  import { initListEditable } from '$core/handlers'

  type TypeItem = $$Generic
  interface $$Slots {
    default: { item: TypeItem }
  }

  let listEl: HTMLDivElement
  export let items: TypeItem[]

  function onChange(newOrderItems: TypeItem[]) {
    items = newOrderItems
  }

  onMount(() =>
    initListEditable<TypeItem>({
      listEl,
      items,
      onChange,
    })
  )
</script>

<div bind:this={listEl}>
  {#each items as item}
    <div class="item">
      <slot {item}>{JSON.stringify(item)}</slot>
    </div>
  {/each}
</div>
