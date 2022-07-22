import {
  ILimits,
  createPlaceholder,
  getItemParent,
  computeLimits,
  initDragStyle,
  resetDragStyle,
  getNewOrderIndex,
} from './utils'
import './index.css'

export type OnHoverHandler = (index: number) => void
export type OnMoveHandler = (indexFrom: number, indexTo: number) => void
export type OnReindexHandler = (newOrder: number[]) => void
export type OnChangeHandler<Type> = (newOrder: Type[]) => void

interface ListEditableOptions<Type = unknown> {
  listEl: HTMLElement | null
  onHover?: OnHoverHandler
  onMove?: OnMoveHandler
  /** Déclencher quand l'ordre change. newOrder est un tableau d'index */
  onReindex?: OnReindexHandler
  /** Déclencher quand l'ordre change. newOrder est les items fournit réordonné */
  onChange?: OnChangeHandler<Type>
  /** Fournir les items pour directement récupérer la liste à jour dans onChange */
  items?: Type[]
  onDelete?: (index: number, items?: Type[]) => void
}

export function initListEditable<Type = unknown>(
  options: ListEditableOptions<Type>
) {
  const { listEl, onDelete, items } = options
  if (!listEl) return

  const mouseDownHandler = createMouseDownHandler<Type>(options)

  const deleteButtons = listEl.querySelectorAll('.item-delete')
  const deleteButtonHandlers: ((event: Event) => void)[] = []
  deleteButtons.forEach((button, index) => {
    const handler = (event: Event) => {
      event.stopPropagation()
      if (onDelete) onDelete(index, items)
    }
    button.addEventListener('mousedown', handler)
    deleteButtonHandlers.push(handler)
  })

  listEl.classList.add('list')
  listEl.addEventListener('mousedown', mouseDownHandler)

  function destroy() {
    listEl?.classList.remove('list')
    listEl?.removeEventListener('mousedown', mouseDownHandler)
    deleteButtonHandlers.forEach((handler, index) => {
      deleteButtons[index].removeEventListener('mousedown', handler)
    })
  }
  return destroy
}

function createMouseDownHandler<Type = unknown>(
  options: ListEditableOptions<Type>
) {
  const { listEl } = options

  return (event: MouseEvent) => {
    const dragEl = getItemParent(event.target as HTMLElement)
    if (!dragEl) return
    if (!listEl) return
    listEl.classList.add('drag-active')
    dragEl.classList.add('drag-active')

    const limits = computeLimits(listEl, dragEl)
    if (!limits) return

    initDragStyle(dragEl)
    const placeholder = createPlaceholder({ listEl, dragEl, limits })

    const index = +(dragEl.dataset.index || 0)
    let indexTo = index
    const handleMouseMove = createMouseMoveHandler(
      { dragEl, limits, originMouseY: event.clientY },
      (_index) => {
        const { onHover } = options

        indexTo = _index
        placeholder.moveTo(indexTo)
        if (onHover) onHover(indexTo)
      }
    )

    const handleMouseUp = () => {
      const { onMove, onChange, onReindex, items } = options

      document.removeEventListener('mousemove', handleMouseMove)
      resetDragStyle(dragEl)
      placeholder.remove()
      listEl.classList.remove('drag-active')
      dragEl.classList.remove('drag-active')
      if (index === indexTo) return
      if (onMove) onMove(index, indexTo)
      if (onChange || onReindex) {
        const len = limits.items.length
        const newOrderIndex = getNewOrderIndex(len, index, indexTo)
        if (onReindex) onReindex(newOrderIndex)
        if (onChange && !items) {
          console.error('WARNING', '"onChange" prop require "items" prop')
        }
        if (onChange && items) {
          const newOrder = newOrderIndex.map((index) => items[index])
          onChange(newOrder)
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp, { once: true })
  }
}

interface CreateMouseMoveOptions {
  dragEl: HTMLElement
  originMouseY: number
  limits: ILimits
}
function createMouseMoveHandler(
  { dragEl, limits, originMouseY }: CreateMouseMoveOptions,
  onHover: (newIndex: number) => void
) {
  let currentIndex = +(dragEl.dataset.index || 0)

  return (event: MouseEvent) => {
    if (!dragEl || !limits || !originMouseY) return
    let deltaMouseY = event.clientY - originMouseY
    if (deltaMouseY < limits.top) deltaMouseY = limits.top
    if (deltaMouseY > limits.bottom) deltaMouseY = limits.bottom

    dragEl.style.transform = `translateY(${deltaMouseY}px)`

    const newIndex = limits.items.findIndex((center) => deltaMouseY <= center)

    if (newIndex !== currentIndex) {
      currentIndex = newIndex
      onHover(newIndex)
    }
  }
}
