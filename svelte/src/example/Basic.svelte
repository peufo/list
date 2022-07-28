<script lang="ts">
  import EditableList from '$lib/EditableList.svelte'
  import { faker } from '@faker-js/faker'

  const items = [...Array(6)].map((u, i) => ({
    name: faker.name.firstName(),
    key: i,
  }))
</script>

<EditableList {items} let:item getKey={(item) => item.key}>
  {item.name}
</EditableList>
