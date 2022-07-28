<script lang="ts">
  import EditableList from '$lib/EditableList.svelte'
  import { items } from './items'
</script>

<EditableList {items} let:item getKey={(item) => item.key}>
  {item.name}
</EditableList>
