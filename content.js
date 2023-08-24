console.log("Custom JS Has Been Injected.");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = browser.extension.getURL("styles.css");

const footer = document.getElementsByClassName("banner_copyright")[0];

const navbar = document.querySelectorAll('.taboff > a, .tabon > a');
const newNavLinks = ["bwskflib.P_SelDefTerm","bwskfshd.P_CrseSchd","bwskotrn.P_ViewTermTran","bzskvate.P_VateaOccsGoal"];
const newNavNames = ["My Classes", "My Schedule", "My Grades", "Pay Fees"];

for (let i = 0; i < navbar.length; i++) {
  navbar[i].href = newNavLinks[i];
	navbar[i].innerHTML = newNavNames[i];
}


if (window.location.pathname == "/pls/OWA_PROD/twbkwbis.p_idm_logout"){
  window.location.href = "/pls/OWA_PROD/twbkwbis.P_WWWLogin";
}

function downloadPageContent() {

  const pageContent = document.documentElement.outerHTML;
  
  const blob = new Blob([pageContent], { type: 'text/html' });

  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'current-page.html';
  downloadLink.textContent = 'Download Page';

  
  downloadLink.click();
}

const downloadButton = document.createElement('button');
downloadButton.textContent = '↓';
downloadButton.addEventListener('click', downloadPageContent);

document.body.appendChild(downloadButton);



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


