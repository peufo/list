import { useState } from 'react'

import fakeItems from './items'
import EditableList from '$lib/EditableList'
import './Advanced.css'

const Advanced = () => {
  const [items, setItems] = useState(fakeItems)

  return (
    <EditableList
      items={items}
      getKey={(item) => item.key}
      onChange={setItems}
      renderItem={(item) => (
        <div className='item'>
          <div className='item-color' style={{ background: item.color }} />
          <div>
            <div>
              <b>{item.name}</b>
            </div>
            <div>{item.city}</div>
          </div>
        </div>
      )}
    />
  )
}

export default Advanced
