function displayNames() {

  var queryString = window.location.search;
  var names = cleanQueryString(queryString)[0];
  names = restoreUnsafeCharacters(names);
  names = window.atob(names);
  var name1;
  var name2;
  var paragraph;
  var paraCount = 1;
  var button;
  var newLine;
  var division = document.getElementById("div");
  var restart = document.getElementById("restart");
  var currentSite = getCurrentSite("/MatchedSantas");
  const nameList = names.split(",");

  restart.setAttribute("href", currentSite + "/");

  division.addEventListener("click", function (evt) {
    const buttons = this.querySelectorAll("button");
    var button;
    for (var i = 0; i < buttons.length; i++) {
      button = buttons.item(i);
      button.innerHTML = "Copy";
    }
  }, true);

  for (var i = 0; i < nameList.length; i += 2) {

    paragraph = document.createElement("p");
    paragraph.setAttribute("id", "p" + paraCount);
    paragraph.style.display = "inline-block";
    paragraph.style.paddingRight = "1%";
    paragraph.appendChild(document.createTextNode(nameList[i]));

    name1 = nameList[i].replace(" ", "+");
    name2 = nameList[i + 1].replace(" ", "+");

    button = document.createElement("button");
    button.setAttribute("id", "b" + paraCount);
    button.setAttribute("value", replaceUnsafeCharacters(window.btoa("n1=" + name1 + "&n2=" + name2)));
    button.appendChild(document.createTextNode("Copy"));
    button.addEventListener("click", function (evt) {
      navigator.clipboard.writeText(currentSite + "/Result?" + this.value);
      this.innerHTML = "Copied";
    });

    newLine = document.createElement("br");

    division.appendChild(paragraph);
    division.appendChild(button);
    division.appendChild(newLine);
    paraCount++;
  }
}
