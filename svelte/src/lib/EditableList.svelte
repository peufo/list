<script lang="ts">
  import { onMount } from 'svelte'

  import { initListEditable } from '$core/index'

  type TypeItem = $$Generic
  interface $$Slots {
    default: { item: TypeItem }
  }

  let listEl: HTMLDivElement
  export let items: TypeItem[]
  export let getKey: (item: TypeItem) => string | number

  function onChange(newOrderItems: TypeItem[]) {
    console.log(newOrderItems)

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
  {#each items as item (getKey(item))}
    <div>
      <slot {item}>{JSON.stringify(item)}</slot>
    </div>
  {/each}
</div>
