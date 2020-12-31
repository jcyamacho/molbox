import { atom, selector } from 'recoil'

const contains = ([x, y, z], [dx, dy, dz]) =>
  Math.abs(x) <= dx &&
  Math.abs(y) <= dy &&
  Math.abs(z) <= dz

const internalElements = atom({
  key: 'internal-elements',
  default: []
})

export const bounds = selector({
  key: 'bounds',
  get: ({ get }) => {
    const items = get(internalElements)
    return items.reduce(([x, y, z], c) =>
      [
        Math.max(x, Math.abs(c.x)),
        Math.max(y, Math.abs(c.y)),
        Math.max(z, Math.abs(c.z))
      ], [0, 0, 0])
  }
})

export const box = atom({
  key: 'box',
  default: bounds
})

export const elements = selector({
  key: 'elements',
  get: ({ get }) => {
    const size = get(box)
    const items = get(internalElements)
    return items.map(it => ({
      ...it,
      internal: contains([it.x, it.y, it.z], size)
    }))
  },
  set: ({ set, reset }, value = []) => {
    set(internalElements, value.map(val => ({
      ...val,
      id: JSON.stringify(val)
    })))
    reset(box)
  }
})
