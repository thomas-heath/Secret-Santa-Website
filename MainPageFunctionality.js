//function displayInputError(errorString) {

  //if (document.body.contains(document.getElementById("InputWarning"))) {
    //var errorElement = document.getElementById("InputWarning");
    //var children = errorElement.childNodes;
    //for (var i = 0; i < children.length; i++) {
    //  errorElement.removeChild(children[i]);
    //}
    //errorElement.appendChild(document.createTextNode(errorString));
    //document.getElementById("InputWarning").innerHTML = "test string";
//    document.body.innerHTML += '<p id="InputWarning">' + errorString + '</p>';
    //document.body.innerHTML = "";
//  } else {
    //var errorElement = document.createElement("p");
    //errorElement.setAttribute("id", "InputWarning");
    //errorElement.appendChild(document.createTextNode(errorString));
//    document.body.innerHTML += '<p id="InputWarning" style="color:#ff0000">' + errorString + '</p>';
//  }
//}
//The above function was meant to edit an error element if it exists, but as soon as it tries to edit an existing element it exits the function without returning for some reason

function ensureCorrectInput(inputText) { //checks to make sure the input text is valid, and prevents submission if it is
  var legalCharacters = /^[A-Za-z ]+$/;
  var spaces = /^[ ]+$/;

  if (!(inputText.value.match(legalCharacters))) {

    document.body.innerHTML += '<p id="InputWarning" style="color:#ff0000">Only alphabet letters and spaces are allowed.</p>';
    return false;

  } else if (inputText.value.match(spaces)) {

    document.body.innerHTML += '<p id="InputWarning" style="color:#ff0000">Please input a name.</p>';
    return false;

  }

  return true;
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

var queryString = window.location.search;
if ( queryString == "" ) {
  document.body.innerHTML += "<h2>Add a participant!</h2>";
  document.body.innerHTML += '<form name="form1" accept-charset="ISO-8859-1"><input type="text" id="n1" name="n1"><input type="submit" value="Add" onclick="ensureCorrectInput(document.form1.n1)"></form>';
} else {
  const nameList = cleanQueryString(queryString);
  var nameCount = nameList.length;
  var previousDataForm = "";

  document.body.innerHTML += ("<h2>Participants: " + nameCount + "</h2>");

  var name;
  var nameIndex;
  for (var i = 0; i < nameCount; i++) {
    name = nameList[i];
    nameIndex = i + 1;
    document.body.innerHTML += ("<p" + nameIndex + ">" + name + "</p" + nameIndex + "><br>");
    previousDataForm += ('<input type="hidden" name="n' + nameIndex + '" value="'  + name + '">');
  }

  document.body.innerHTML += ('<form name="form1" accept-charset="ISO-8859-1">' + previousDataForm + '<input type="text" id="n1" name="n' + (nameCount + 1) + '"><input type="submit" value="Add" onclick="ensureCorrectInput(document.form1.n' + (nameCount + 1) + ')"></form>');
}
