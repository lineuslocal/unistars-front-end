
//Title bar
export function changeTitle (state, name) {
  state.title = name
}
export function changeShowBack (state, val) {
  state.showBack = val
}
export function changeShowMenu (state, val) {
  state.showMenu = val
}
//Event
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
export function addIsClick (state) {
  state.isClick.push(false)
}
export function changeStateIsClick(state, {index,val})  {
  state.isClick[index] = val
}
export function setCurrentMenu(state, val) {
  state.currentMenu = val
}

//FAQ
export function addFaq (state, topic) {
  state.faq.push(topic)
}
export function removeFaq (state, indexTopic) {
  state.faq.splice(indexTopic, 1)
}
export function changeUrlFaq (state, {name, url}) {
  state.faq.forEach(f => {
    if (f.name == name) {
      f.urlHistory = url
    }
  });
}
