document.addEventListener('DOMContentLoaded', function() {
    const apiKeyInput = document.getElementById('apiKey');
    const saveButton = document.getElementById('saveButton');
  
    // Load the saved API key, if available
    chrome.storage.sync.get(['apiKey'], function(result) {
      if (result.apiKey) {
        apiKeyInput.value = result.apiKey;
      }
    });
  
    saveButton.addEventListener('click', function() {
      const apiKey = apiKeyInput.value;
  
      if (!apiKey) {
        alert('Please enter your API key.');
        return;
      }
  
      // Save the API key in Chrome storage
      chrome.storage.sync.set({ apiKey: apiKey }, function() {
        console.log('API key saved:', apiKey);
        alert('API key saved successfully.');
      });
    });
  });
  

  // Save API Key 
document.getElementById('saveButton').addEventListener('click', () => {
    const apiKey = document.getElementById('apiKey').value;
    chrome.storage.sync.set({apiKey: apiKey}, () => {
      console.log('API Key saved');
    });
  });
  
  // Load saved API Key
  chrome.storage.sync.get('apiKey', data => {
    document.getElementById('apiKey').value = data.apiKey; 
  });