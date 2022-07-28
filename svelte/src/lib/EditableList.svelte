<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { initListEditable } from '$core/index'

  type TypeItem = $$Generic
  interface $$Slots {
    default: { item: TypeItem }
  }
  interface Events {
    change: TypeItem[]
    reindex: number[]
    hover: number
    move: { indexFrom: number; indexTo: number }
  }

  const dispatch = createEventDispatcher<Events>()

  let listEl: HTMLDivElement
  export let items: TypeItem[]
  export let getKey: (item: TypeItem) => string | number

  function onChange(newOrderItems: TypeItem[]) {
    dispatch('change', newOrderItems)
    items = newOrderItems
  }

  onMount(() =>
    initListEditable<TypeItem>({
      listEl,
      items,
      onChange,
      onReindex: (newOrderIndex) => dispatch('reindex', newOrderIndex),
      onHover: (index) => dispatch('hover', index),
      onMove: (indexFrom, indexTo) => dispatch('move', { indexFrom, indexTo }),
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
