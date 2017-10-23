import worlds from './worlds'

const list = Object.keys(worlds).map((id) => {
  return Object.assign({}, worlds[id], {id: id})
})

list.sort((a, b) => {
  return a.name.localeCompare(b.name)
})

module.exports = list
