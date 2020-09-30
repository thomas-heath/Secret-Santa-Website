function matchNames(nameList, nameCount) { //Returns an array where the elements are arrays containing each name along with a randomly selected name

  function getRandomInt(number) { //returns a random int from 0 to the number exluding the number
    return Math.floor(Math.random() * number);
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

  const matchList = [];
  shuffle(nameList);
  const gifteeList = [...nameList];
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

          gifteeList.splice(gifteeList.indexOf(gifter), 1);
          giftee = gifteeList[getRandomInt(gifteeList.length)];
          gifteeList.push(gifter);
          gifteeList.splice(gifteeList.indexOf(giftee), 1);
          matchList.push([gifter, giftee]);

      } else if (gifteeList.length == 1) {

          matchList.push([gifter, gifteeList[0]]);
          gifteeList.splice(0, 1);

      } else {

          giftee = gifteeList[getRandomInt(gifteeList.length)];
          gifteeList.splice(gifteeList.indexOf(giftee), 1);
          matchList.push([gifter, giftee]);
      }
    }
  }
  return matchList;
}

function buildBody() {

  function displayInputError() {

    errorDisplay = document.getElementById("InputWarning");

    if (input.value === "") {

      errorDisplay.setAttribute("hidden", "");
    } else {

      errorDisplay.removeAttribute("hidden");
    }
  }

  function preventSpace(e) {

    var inputLength = e.target.value.length;
    var letters = /\w/;

    if (!letters.test(e.target.value)) {

      e.target.value = e.target.value.slice(0, -1);

    } else if (e.target.value.charAt(inputLength - 1) == " " && e.target.value.charAt(inputLength - 2) == " ") {

      e.target.value = e.target.value.slice(0, -1);
    }
  }

  var queryString = window.location.search;
  const nameList = cleanQueryString(queryString);
  var nameCount = nameList.length;
  var listItem;
  var h2 = document.getElementById("h2");
  var ul = document.getElementById("namelist");
  var form1 = document.getElementById("form1");
  var form2 = document.getElementById("form2");

  if ( queryString == "" ) { //checks for a querystring

    h2.appendChild(document.createTextNode("Add a participant!"));

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "n1");
    input.setAttribute("name", "n1");
    input.setAttribute("required", "");
    input.setAttribute("pattern", "[A-Za-z ]+");
    input.setAttribute("maxlength", "18");
    input.oninput = preventSpace;
    var submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Add");

    form1.appendChild(input);
    form1.appendChild(submitInput);
    input.addEventListener("invalid", displayInputError);

  } else if (nameList.length < 2) { //checks to see if there is only one name

    var name = nameList[0];

    headerText = "Participants: " + nameCount;
    h2.appendChild(document.createTextNode(headerText));

    listItem = document.createElement("li");
    listItem.setAttribute("class", "text-center");
    listItem.appendChild(document.createTextNode(name));

    var form1 = document.getElementById("form1");

    var hiddenInput1 = document.createElement("input");
    hiddenInput1.setAttribute("type", "hidden");
    hiddenInput1.setAttribute("name", "n1");
    hiddenInput1.setAttribute("value", name);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "n2");
    input.setAttribute("name", "n2");
    input.setAttribute("required", "");
    input.setAttribute("maxlength", "18");
    input.oninput = preventSpace;
    input.setAttribute("pattern", "[A-Za-z ]+");

    var submitInput = document.createElement("input");
    submitInput.setAttribute("type", "submit");
    submitInput.setAttribute("value", "Add");

    //puts the elements into the document
    ul.appendChild(listItem);
    form1.appendChild(hiddenInput1);
    form1.appendChild(input);
    form1.appendChild(submitInput);
    input.addEventListener("invalid", displayInputError);

  } else{

    var hiddenInput1;
    var name;
    var nameIndex = 1;

    headerText = "Participants: " + nameCount;
    h2.appendChild(document.createTextNode(headerText));

    form2.setAttribute("action", "MatchedSantas");

    for (var i = 0; i < nameCount; i++) {
      name = nameList[i];

      listItem = document.createElement("li");
      listItem.appendChild(document.createTextNode(name));
      listItem.setAttribute("class", "text-center");

      ul.appendChild(listItem);

      hiddenInput1 = document.createElement("input");
      hiddenInput1.setAttribute("type", "hidden");
      hiddenInput1.setAttribute("name", "n" + nameIndex);
      hiddenInput1.setAttribute("value", name);

      form1.appendChild(hiddenInput1);

      nameIndex++;
    }

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "n" + (nameCount + 1));
    input.setAttribute("name", "n" + (nameCount + 1));
    input.setAttribute("required", "");
    input.setAttribute("maxlength", "18");
    input.oninput = preventSpace;
    input.setAttribute("pattern", "[A-Za-z ]+");

    var submitInput1 = document.createElement("input");
    submitInput1.setAttribute("type", "submit");
    submitInput1.setAttribute("value", "Add");

    form1.appendChild(input);
    form1.appendChild(submitInput1);

    var matches = matchNames(nameList, nameCount).toString();
    var encodedMatches = window.btoa(matches);
    encodedMatches = replaceUnsafeCharacters(encodedMatches);
    var hiddenInput2 = document.createElement("input");
    hiddenInput2.setAttribute("type", "hidden");
    hiddenInput2.setAttribute("name", "matches");
    hiddenInput2.setAttribute("value", encodedMatches);

    var submitInput2 = document.createElement("input");
    submitInput2.setAttribute("type", "submit");
    submitInput2.setAttribute("value", "Go!");

    form2.appendChild(hiddenInput2);
    form2.appendChild(submitInput2);

    input.addEventListener("invalid", displayInputError);
  }
}
