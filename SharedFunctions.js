function cleanQueryString(queryString) { //Turns the queryString into an array, removes keys, then returns the array.
  queryString = queryString.substring(1);
  const nameList = [];
  var item;

  if (queryString.includes("&")) {
    const dataArray = queryString.split("&");

    for (i = 0; i < dataArray.length; i++) {
      item = dataArray[i].split("=")[1];
      item = item.split("+").join(" ");
      nameList.push(item);
    }

    return nameList;

  } else if (queryString.includes("=")){
    item = queryString.split("=")[1];
    item = item.split("+").join(" ");
    nameList.push(item);

    return nameList;
  } else {

    nameList.push(queryString);
    return nameList;
  }
}

function getCurrentSite(currentPage) {

  return window.location.href.split(currentPage)[0];
}

function replaceUnsafeCharacters(string) {
  string = string.split("+").join("%");
  string = string.split("/").join("^");
  string = string.split("=").join("_");

  return string;
}

function restoreUnsafeCharacters(string) {
  string = string.split("%").join("+");
  string = string.split("^").join("/");
  string = string.split("_").join("=");

  return string;
}
