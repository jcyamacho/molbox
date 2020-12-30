const readFileAsText = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onerror = () => {
    reject(reader.error)
    reader.abort()
  }
  reader.onload = () => resolve(reader.result)
  reader.readAsText(file)
})

function parseData (line) {
  const parts = line.split(' ').filter(x => x)
  if (parts.length !== 4) {
    return undefined
  }
  const [name, x, y, z] = parts
  return {
    name,
    x: parseFloat(x),
    y: parseFloat(y),
    z: parseFloat(z)
  }
}

export async function readData (file) {
  const text = await readFileAsText(file)
  const lines = text.split('\n')
  return lines
    .map(parseData)
    .filter(x => x)
}
