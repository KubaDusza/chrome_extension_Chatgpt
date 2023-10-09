chrome.runtime.onInstalled.addListener(function() {
    console.log('set up the menu')
  // Add context menu item to allow text selection
  chrome.contextMenus.create({
    id: 'explainText',
    title: 'Explain Selected Text',
    contexts: ['selection'],
  });
});

// Handle context menu item click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log(info, tab);
  if (info.menuItemId === 'explainText') {
    const selectedText = info.selectionText;

    // Send the selected text to the content script
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (text) => {
        // This function will be executed in the context of the webpage
        // You can use it to send the selected text back to the background script
        chrome.runtime.sendMessage({ text });
      },
      args: [selectedText],
    });
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.text) {
    // Do something with the selected text, if needed
    // You can also initiate the explanation process from here
  }
});

// Load API Key
chrome.storage.sync.get('apiKey', data => {
    let apiKey = data.apiKey;
    // use apiKey
  });