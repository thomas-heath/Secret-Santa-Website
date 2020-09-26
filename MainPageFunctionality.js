function displayInputError() {

  if (input.value === "") {

    errorDisplay.setAttribute("hidden", "");
  } else {

    errorDisplay.removeAttribute("hidden");
  }
}

function shuffle(array) { //Shuffles an array
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function cleanQueryString(queryString) { //Turns the queryString into an array, removes symbols and keys, then returns the array.
  queryString = queryString.substring(1);
  const dataArray = queryString.split("&");
  const nameList = [];

  for (i = 0; i < dataArray.length; i++) {
    name = dataArray[i].split("=")[1];
    name = name.split("+").join(" ");
    nameList.push(name);
  }

  return nameList;
}

function getRandomInt(max) { //returns a random int from 0 to max
  return Math.floor(Math.random() * Math.floor(max));
}

function matchNames() { //Returns an array where the elements are arrays containing each name along with a randomly selected name

  const matchList = [];
  shuffle(nameList);
  const gifteeList = nameList;
  var gifter;
  var giftee;
  var endGifter = nameList[nameCount - 1];

  for (var i = 0; i < nameCount; i++) {

    if (i == nameCount - 2 && gifteeList.includes(endGifter)) {

        gifter = nameList[i];
        giftee = endGifter;
        gifteeList.splice(gifteeList.indexOf(giftee), 1);
        matchList.push([gifter, giftee]);

    } else {

      gifter = nameList[i];

      if (gifteeList.includes(gifter)) {

          gifteeList.splice(gifteeList.indexOf(gifter));
          giftee = gifteeList[getRandomInt(gifteeList.length - 1)];
          gifteeList.push(gifter);
          gifteeList.splice(gifteeList.indexOf(giftee));
          matchList.push([gifter, giftee]);

      } else if (gifteeList.length == 1) {

          matchList.push([gifter, gifteeList[0]]);

      } else {

          giftee = gifteeList[getRandomInt(gifteeListlength - 1)];
          gifteeList.splice(gifteeList.indexOf(giftee));
          matchList.push([gifter, giftee]);

      }
    }
  }
}

var errorDisplay = document.createElement("p");
errorDisplay.setAttribute("id", "InputWarning");
errorDisplay.setAttribute("hidden", "");
errorDisplay.appendChild(document.createTextNode("Only alphabet letters and spaces are allowed."));
errorDisplay.style.color = "#ff0000";

var queryString = window.location.search;
if ( queryString == "" ) {

  //Builds all the elements
  var h2 = document.createElement("h2");
  h2.appendChild(document.createTextNode("Add a participant!"));

  var form1 = document.createElement("form");
  form1.setAttribute("name", "form1");

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "n1");
  input.setAttribute("name", "n1");
  input.setAttribute("required", "");
  input.setAttribute("pattern", "^[A-Za-z ]+$");

  var submitInput = document.createElement("input");
  submitInput.setAttribute("type", "submit");
  submitInput.setAttribute("value", "Add");

  //puts the elements into the document
  document.body.appendChild(h2);
  form1.appendChild(input);
  form1.appendChild(submitInput);
  document.body.appendChild(form1);
  document.body.appendChild(errorDisplay);
  input.addEventListener("invalid", displayInputError);

} else {
  const nameList = cleanQueryString(queryString);
  var nameCount = nameList.length;
  var hiddenInput1;
  var name;
  var nameIndex;
  var listItem;

  var h2 = document.createElement("h2");
  headerText = "Participants: " + nameCount;
  h2.appendChild(document.createTextNode(headerText));

  var form1 = document.createElement("form");
  form1.setAttribute("name", "form1");

  var form2 = document.createElement("form");
  form2.setAttribute("name", "form2");
  form2.setAttribute("action", "MatchedSantas");

  var list = document.createElement("ul");
  list.style.listStyle = "none";

  for (var i = 0; i < nameCount; i++) {
    name = nameList[i];
    nameIndex = i + 1;

    listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(name));

    list.appendChild(listItem);

    hiddenInput1 = document.createElement("input");
    hiddenInput1.setAttribute("type", "hidden");
    hiddenInput1.setAttribute("name", "n" + nameIndex);
    hiddenInput1.setAttribute("value", name);

    hiddenInput2 = hiddenInput1.cloneNode();

    form1.appendChild(hiddenInput1);
    form2.appendChild(hiddenInput2);
  }

  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "n" + (nameCount + 1));
  input.setAttribute("name", "n" + (nameCount + 1));
  input.setAttribute("required", "");
  input.setAttribute("pattern", "^[A-Za-z ]+$");

  var submitInput1 = document.createElement("input");
  submitInput1.setAttribute("type", "submit");
  submitInput1.setAttribute("value", "Add");

  form1.appendChild(input);
  form1.appendChild(submitInput1);

  var submitInput2 = document.createElement("input");
  submitInput2.setAttribute("type", "submit");
  submitInput2.setAttribute("value", "Go!");

  form2.appendChild(submitInput2);

  document.body.appendChild(h2);
  document.body.appendChild(list);
  document.body.appendChild(form1);
  input.addEventListener("invalid", displayInputError);
  document.body.appendChild(errorDisplay);
  document.body.appendChild(form2);
}
