<script lang="ts">
  import EditableList from '$lib/EditableList.svelte'
  import { items } from './items'
</script>

<EditableList {items} let:item let:index getKey={(item) => item.key}>
  <div class="item">
    <div class="item-color" style="background: {item.color};" />
    <div>
      <div><b>{item.name}</b></div>
      <div>{item.city}</div>
    </div>
  </div>
</EditableList>

<style>
  .item {
    padding: 4px;
    display: flex;
    gap: 4px;
    align-items: stretch;
  }

  .item-color {
    width: 10px;
    border-radius: 5px;
  }
</style>
