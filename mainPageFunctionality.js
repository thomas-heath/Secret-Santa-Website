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

var queryString = window.location.search;
if ( queryString == "" ) {
  document.body.innerHTML += "<h2>Add a participant!</h2>";
  document.body.innerHTML += '<form name="form1" accept-charset="ISO-8859-1"><input type="text" id="n1" name="n1"><input type="submit" value="Add" onclick="ensureCorrectInput(document.form1.n1)"></form>';
} else {
  queryString = queryString.substring(1);
  var nameList = queryString.split("&");
  var nameCount = nameList.length;
  var previousDataForm = "";

  document.body.innerHTML += ("<h2>Participants: " + nameCount + "</h2>");

  var i;
  var name;
  for (i = 0; i < nameCount; i++) {
    name = nameList[i].substring(3).split("+").join(" ");
    document.body.innerHTML += ("<p" + (i + 1) + ">" + name + "</p" + (i + 1) + "><br>");
    previousDataForm += ('<input type="hidden" name="n' + (i + 1) + '" value="'  + name + '">');
  }

  document.body.innerHTML += ('<form name="form1" accept-charset="ISO-8859-1">' + previousDataForm + '<input type="text" id="n1" name="n' + (nameCount + 1) + '"><input type="submit" value="Add" onclick="ensureCorrectInput(document.form1.n' + (nameCount + 1) + ')"></form>');
}
