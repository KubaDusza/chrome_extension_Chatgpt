document.addEventListener('DOMContentLoaded', function() {
    const selectedText = document.getElementById('selectedText');
    const explainButton = document.getElementById('explainButton');
    const explanationDiv = document.getElementById('explanation');
  
    explainButton.addEventListener('click', async () => {
      const text = selectedText.value;
  
      // Get the user's OpenAI API key
      const { apiKey } = await chrome.storage.sync.get('apiKey');
  
      if (!apiKey) {
        alert('Please enter your API key in the options.');
        return;
      }
      console.log("AAAAAAA");
  
      const MAX_ITER = 5;
      const TOKENS = 100;
      let i = MAX_ITER;
      let finish_reason = 'length';
      let explanation = '';
      let previous_responses = '';
  
      while (i > 0 && finish_reason === 'length') {
        const prompt =
          '### INSTRUCTIONS: Your job is to explain the text to the user. You are an expert in the relevant field. YOUR RESPONSE SHOULD BE VERY CONCISE ###' +
          '### USER TEXT TO EXPLAIN:\n' +
          text + '\n### EXPLAIN IT ' + 
          previous_responses;
  
        if (i === MAX_ITER) {
          previous_responses = '### COMPLETE THE PREVIOUS RESPONSE: ';
        } else {
          previous_responses = previous_responses + explanation;
        }
        i--;
  
        try {
          const params = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + apiKey,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo-instruct',
              prompt: prompt,
              max_tokens: TOKENS,
              temperature: 0.7,
            }),
          };
  
          const response = await fetch('https://api.openai.com/v1/completions', params);
          const responseData = await response.json();
          explanation = explanation + responseData.choices[0].text;
  
          finish_reason = responseData.choices[0].finish_reason;
          // Display the explanation
          explanationDiv.innerHTML = explanation;
            //'Finish Reason: ' + finish_reason + '<br>' + explanation + '<br>PROMPT: ' + prompt;
        } catch (error) {
          console.error('Error:', error);
          explanationDiv.innerHTML = 'Error occurred while fetching explanation: ' + error;
        }
      }
    });
  });
  