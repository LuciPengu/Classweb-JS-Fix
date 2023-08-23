console.log("Custom JS Has Been Injected.");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = browser.extension.getURL("styles.css");

const navbar = document.querySelectorAll('.taboff > a, .tabon > a');
const newNavLinks = ["bwskflib.P_SelDefTerm","bwskfshd.P_CrseSchd","bwskotrn.P_ViewTermTran","bzskvate.P_VateaOccsGoal"];
const newNavNames = ["Add Classes", "My Schedule", "My Grades", "Pay Fees"];
console.log(navbar);
let i = 0
navbar.forEach((anchor) => {
	console.log(anchor.href);
  // Modify the href attribute
  anchor.href = newNavLinks[i];
	anchor.innerHTML = newNavNames[i];
	i ++;
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

