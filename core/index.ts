import type { ListEditableOptions } from './type'
import { createMouseDownHandler } from './handlers'

export const CLASSNAME_LIST = 'editable-list'
export const CLASSNAME_DRAG_ACTIVE = 'drag-active'
export const CLASSNAME_PLACEHOLDER = 'item-placholder'
export const CLASSNAME_DELETE = 'item-delete'

export function initListEditable<Type = unknown>(
  options: ListEditableOptions<Type>
) {
  const { listEl, onDelete, items } = options
  if (!listEl) return

  const mouseDownHandler = createMouseDownHandler<Type>(options)

  const deleteButtons = listEl.querySelectorAll(CLASSNAME_DELETE)
  const deleteButtonHandlers: ((event: Event) => void)[] = []
  deleteButtons.forEach((button, index) => {
    const handler = (event: Event) => {
      event.stopPropagation()
      if (onDelete) onDelete(index, items)
    }
    button.addEventListener('mousedown', handler)
    deleteButtonHandlers.push(handler)
  })

  listEl.classList.add(CLASSNAME_LIST)
  listEl.addEventListener('mousedown', mouseDownHandler)

  function destroy() {
    if (listEl) {
      listEl.classList.remove(CLASSNAME_LIST)
      listEl.removeEventListener('mousedown', mouseDownHandler)
    }
    deleteButtonHandlers.forEach((handler, index) => {
      deleteButtons[index].removeEventListener('mousedown', handler)
    })
  }
  return destroy
}
