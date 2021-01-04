import * as THREE from 'three'
import { atom, selector } from 'recoil'

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

export const boxSize = atom({
  key: 'box-position',
  default: bounds
})

export const boxRotation = atom({
  key: 'box-rotation',
  default: [0, 0, 0]
})

export const elements = selector({
  key: 'elements',
  get: ({ get }) => {
    const [dx, dy, dz] = get(boxSize)
    const [rx, ry, rz] = get(boxRotation)
    const items = get(internalElements)

    const m = new THREE.Matrix4()
      .multiply(new THREE.Matrix4().makeRotationX(rx))
      .multiply(new THREE.Matrix4().makeRotationY(ry))
      .multiply(new THREE.Matrix4().makeRotationZ(rz))
      .invert()

    const b = new THREE.Box3(
      new THREE.Vector3(-dx, -dy, -dz),
      new THREE.Vector3(dx, dy, dz)
    )

    return items.map(({ name, x, y, z }) => {
      const center = new THREE.Vector3(x, y, z)
      const internal = b.containsPoint(center.clone().applyMatrix4(m))
      return ({
        id: `${name}-${x}.${y}.${z}`,
        name,
        center,
        internal
      })
    })
  },
  set: ({ set, reset }, value = []) => {
    set(internalElements, value)
    reset(boxSize)
    reset(boxRotation)
  }
})
