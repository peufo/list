import type { ListEditableOptions, CreateMouseMoveOptions } from './type'
import './index.css'
import { CLASSNAME_DRAG_ACTIVE } from './index'
import { initDragStyle, resetDragStyle } from './style'
import {
  createPlaceholder,
  getListItem,
  computeLimits,
  getNewOrderIndex,
  getListItemIndex,
} from './utils'

export function createMouseDownHandler<Type = unknown>(
  options: ListEditableOptions<Type>
) {
  const { listEl } = options

  return (event: MouseEvent) => {
    const dragEl = getListItem(event.target as HTMLElement)
    if (!dragEl) return
    if (!listEl) return
    listEl.classList.add(CLASSNAME_DRAG_ACTIVE)
    dragEl.classList.add(CLASSNAME_DRAG_ACTIVE)

    const limits = computeLimits(listEl, dragEl)
    if (!limits) return

    initDragStyle(dragEl)
    const indexFrom = getListItemIndex(listEl, dragEl)
    const placeholder = createPlaceholder({ listEl, dragEl, indexFrom })

    let indexTo = indexFrom
    const handleMouseMove = createMouseMoveHandler(
      { dragEl, limits, originMouseY: event.clientY, indexFrom },
      (newIndex) => {
        const { onHover } = options
        indexTo = newIndex
        placeholder.moveTo(indexTo)
        if (onHover) onHover(indexTo)
      }
    )

    const handleMouseUp = () => {
      const { onMove, onChange, onReindex, items } = options

      document.removeEventListener('mousemove', handleMouseMove)
      resetDragStyle(dragEl)
      placeholder.remove()
      listEl.classList.remove(CLASSNAME_DRAG_ACTIVE)
      dragEl.classList.remove(CLASSNAME_DRAG_ACTIVE)
      if (indexFrom === indexTo) return
      if (onMove) onMove(indexFrom, indexTo)
      if (onChange || onReindex) {
        const len = limits.items.length
        const newOrderIndex = getNewOrderIndex(len, indexFrom, indexTo)
        if (onReindex) onReindex(newOrderIndex)
        if (onChange && !items) {
          console.error('WARNING', 'The option "onChange" require "items"')
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

function createMouseMoveHandler(
  { dragEl, limits, originMouseY, indexFrom }: CreateMouseMoveOptions,
  onHover: (newIndex: number) => void
) {
  let currentIndex = indexFrom

  return (event: MouseEvent) => {
    if (!dragEl || !limits || !originMouseY) return
    let deltaMouseY = event.clientY - originMouseY
    if (deltaMouseY < limits.top) deltaMouseY = limits.top
    if (deltaMouseY > limits.bottom) deltaMouseY = limits.bottom

    dragEl.style.transform = `translateY(${deltaMouseY}px)`

    const newIndex = limits.items.findIndex((center) => deltaMouseY <= center)

    if (newIndex !== currentIndex) {
      console.log({ newIndex })
      currentIndex = newIndex
      onHover(newIndex)
    }
  }
}
