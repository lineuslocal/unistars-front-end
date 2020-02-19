export function addTab (state, tabName) {
  state.allCurrentTab.push(tabName)
}
export function removeTab (state, indexCat) {
  state.allCurrentTab.splice(indexCat, 1)
}
export function addCatalog (state, catalog) {
  state.catalogs.push(catalog)
}
export function removeCatalog (state, indexCat) {
  state.catalogs.splice(indexCat, 1) 
}
export function changeUrl (state, {index, url}) {
  state.urlHistory[index].url = url
}
export function addUrlHistory (state, history) {
  state.urlHistory.push(history)
}