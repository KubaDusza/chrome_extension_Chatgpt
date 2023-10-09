// content.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text) {
      // Send the selected text to the background script
      chrome.runtime.sendMessage({ text: request.text });
    }
  });
  