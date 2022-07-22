export function initDragStyle(dragEl: HTMLElement) {
  dragEl.style.zIndex = `${+dragEl.style.zIndex + 1}`
  dragEl.style.top = `${dragEl.offsetTop}px`
  dragEl.style.width = `${dragEl.offsetWidth}px`
  dragEl.style.height = `${dragEl.offsetHeight}px`
  dragEl.style.position = 'absolute'
}

export function resetDragStyle(dragEl: HTMLElement) {
  dragEl.style.zIndex = `${+dragEl.style.zIndex - 1}`
  dragEl.style.transform = ''
  dragEl.style.position = 'initial'
  dragEl.style.width = `auto`
  dragEl.style.height = `auto`
}

/** Permet de remonter sur la div .item depuis click.target */
export function getItemParent(element: HTMLElement | null): HTMLElement | null {
  if (element === null) return null
  if (element.classList.contains('item')) return element
  return getItemParent(element.parentElement)
}

interface UpdatePlaceholderArgs {
  listEl: HTMLElement
  dragEl: HTMLElement
  limits: ILimits
}

export function createPlaceholder({
  listEl,
  dragEl,
  limits,
}: UpdatePlaceholderArgs) {
  const initialIndex = +(dragEl.dataset.index || 0)

  const placeholderEl = document.createElement('div')
  placeholderEl.classList.add('placeholder')
  placeholderEl.style.height = `${dragEl.offsetHeight}px`
  const moveTo = (index: number) => {
    if (index === limits.items.length - 1) {
      listEl.appendChild(placeholderEl)
      return
    }
    const selectorIndex = index < initialIndex ? index : index + 1
    const query = `[data-index="${selectorIndex}"]`
    const itemNode = listEl.querySelector(query)
    listEl.insertBefore(placeholderEl, itemNode)
  }
  moveTo(initialIndex)
  return {
    moveTo,
    remove() {
      const parent = placeholderEl.parentNode
      parent?.removeChild(placeholderEl)
      placeholderEl.remove()
    },
  }
}

export interface ILimits {
  top: number
  bottom: number
  items: number[]
}

/** Calcule les limites de déplacement supérieur, inférieur et les frontières entre deux items */
export function computeLimits(
  listEl: HTMLElement,
  dragEl: HTMLElement
): ILimits | null {
  const rect = dragEl.getBoundingClientRect()

  const itemsElements = listEl.querySelectorAll<HTMLDivElement>('.item')
  const itemsRect = Array.from(itemsElements).map((item) =>
    item.getBoundingClientRect()
  )

  const tops = itemsRect.map((item) => item.top - rect.top)
  const bottoms = itemsRect.map((item) => item.bottom - rect.bottom)
  const items = itemsRect
    .map((item, index, self) => {
      if (index === self.length - 1) return false
      if (tops[index] < 0) return tops[index] + item.height / 2
      return bottoms[index] + self[index + 1].height / 2
    })
    .filter((v) => v !== false) as number[]
  items.push(Infinity)
  return {
    top: tops[0],
    bottom: bottoms[bottoms.length - 1],
    items,
  }
}

export function getNewOrderIndex(
  len: number,
  indexFrom: number,
  indexTo: number
): number[] {
  const [start, end] = [indexFrom, indexTo].sort((a, b) => a - b)
  const arr = Array(len)
    .fill(null)
    .map((_, i) => i)
  const arrStart = arr.slice(0, start)
  const arrEnd = arr.slice(end + 1)
  const arrMove = arr.slice(start, end + 1)
  if (indexFrom < indexTo) {
    arrMove.shift()
    arrMove.push(indexFrom)
  } else {
    arrMove.pop()
    arrMove.unshift(indexFrom)
  }
  const newOrder = [...arrStart, ...arrMove, ...arrEnd]

  return newOrder
}
