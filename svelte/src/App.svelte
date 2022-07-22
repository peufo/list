<script lang="ts">
  import EditableList from '$lib/EditableList.svelte'
  import { faker } from '@faker-js/faker'

  const items = Array(10)
    .fill(null)
    .map(() => ({
      name: faker.name.firstName(),
      city: faker.address.cityName(),
      color: faker.color.rgb({ format: 'css' }),
    }))
</script>

<main>
  <EditableList {items} let:item>
    <div class="item">
      <div class="item-color" style="background: {item.color};" />
      <div>
        <div><b>{item.name}</b></div>
        <div>{item.city}</div>
      </div>
    </div>
  </EditableList>
</main>

<style>
  .item {
    padding: 2px;
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .item-color {
    height: 45px;
    width: 10px;
    border-radius: 5px;
  }
</style>
