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
