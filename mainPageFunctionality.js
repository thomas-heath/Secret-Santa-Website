function ensureCorrectInput(inputText) {
  var legalCharacters = /^[A-Za-z ]+$/;
  var spaces = /^[ ]+$/;

  if (!(inputText.value.match(legalCharacters))) {

    document.body.innerHTML += '<p style="color:#ff0000">Only alphabet letters and spaces are allowed.</p>';
    return false;
  } else if (inputText.value.match(spaces)) {

    document.body.innerHTML += '<p style="color:#ff0000">Please input a name.</p>';
    return false;

  }

  return true;
}

function shuffle(array) {
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

function cleanQueryString(queryString) {
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

//function matchNames() {


//}

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
