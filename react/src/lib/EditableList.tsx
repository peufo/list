import { ReactElement, useEffect, useRef } from 'react'
import { initListEditable } from '$core/index'
import type { ListEditableOptions } from '$core/type'

interface IProps<TypeItem = object>
  extends Omit<ListEditableOptions<TypeItem>, 'listEl'> {
  getKey: (item: TypeItem) => string | number
  renderItem: (item: TypeItem) => ReactElement
}

export default function EditableList<TypeItem = object>(
  options: IProps<TypeItem>
) {
  const listRef = useRef<HTMLDivElement>(null)
  const { items, getKey, renderItem } = options

  useEffect(() => initListEditable({ ...options, listEl: listRef.current }), [])

  return (
    <div ref={listRef}>
      {items?.map((item) => (
        <div key={getKey(item)}>{renderItem(item)}</div>
      ))}
    </div>
  )
}
