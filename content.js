console.log("Custom JS Has Been Injected.");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = browser.extension.getURL("styles.css");

const navbar = document.querySelectorAll('table[summary="This table displays Tab Items."] > a');
console.log(navbar);
navbar.forEach((anchor) => {
	console.log(anchor.href);
  // Modify the href attribute
  anchor.href = 'pornhub.com';
});



for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith("custom-variable-")) {
    const variableName = key.slice("custom-variable-".length);
    const variableValue = localStorage.getItem(key);
    document.documentElement.style.setProperty(
      `--${variableName}`,
      variableValue
    );
  }
}

browser.runtime.onMessage.addListener(function (message) {
  const { variableName, variableValue } = message;
  document.head.appendChild(link);
  localStorage.setItem(`custom-variable-${variableName}`, variableValue);
  document.documentElement.style.setProperty(
    `--${variableName}`,
    variableValue
  );
});

