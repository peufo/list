import { useState } from 'react'

import fakeItems from './items'
import EditableList from '$lib/EditableList'

const Basic = () => {
  const [items, setItems] = useState(fakeItems)

  return (
    <EditableList
      items={items}
      getKey={(item) => item.key}
      onChange={setItems}
      renderItem={(item) => <>{item.name}</>}
    />
  )
}

export default Basic
