document.addEventListener("DOMContentLoaded", function() {
  const applyButton = document.getElementById("apply");
  const variableNameInput = document.getElementById("variable-name");
  const variableValueInput = document.getElementById("variable-value");
  const preloadButtons = document.querySelectorAll(".preload-button");

  applyButton.addEventListener("click", function() {
    const variableName = variableNameInput.value;
    const variableValue = variableValueInput.value;

    // Send a message to the content script to change the CSS variable
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      browser.tabs.sendMessage(tabs[0].id, { variableName, variableValue });
    });
  });

  // Add click event listeners to preload buttons
  preloadButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const values = JSON.parse(button.getAttribute("data-values"));

      // Set input fields with preloaded values
      for (const variableName in values) {
        const variableValue = values[variableName];
        variableNameInput.value = variableName;
        variableValueInput.value = variableValue;

        // Send a message to the content script to change the CSS variable
        browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          browser.tabs.sendMessage(tabs[0].id, { variableName, variableValue });
        });
      }
    });
  });
});
