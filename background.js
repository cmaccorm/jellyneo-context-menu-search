var lastTabIndex;

chrome.contextMenus.create({
      title: "Search Jellyneo for \"%s\"",
      id: "jellyneo-command",
      contexts: ["selection"],
      onclick: onClick });

function onClick(info, tab) {
  if (info.menuItemId == "jellyneo-command") {
      sendSearch(info.selectionText);
  }
}

function sendSearch(selectedText) {
  var replacedSelectedText = selectedText.split(' ').join('+');
  var serviceCall = 'https://items.jellyneo.net/search/?name=' + replacedSelectedText;
  chrome.tabs.query({ active: true, currentWindow: true },
    tabs => {
      lastTabIndex = tabs[0].index;
      chrome.tabs.create({
        index: lastTabIndex + 1,
        url: serviceCall });
    });
    //when we delete this jellyneo search tab, go to the last open tab
    chrome.tabs.onRemoved.addListener(onRemoved);
}

function onRemoved(tabId, removeInfo){
  chrome.tabs.highlight({'tabs': lastTabIndex}, function(){});
  chrome.tabs.onRemoved.removeListener(onRemoved);
}