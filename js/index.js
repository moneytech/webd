// Removes white space from a string value.
// return  A string with leading and trailing white-space removed.
function trim(str) 
{
  // Uses a regex to remove spaces from a string.
  return str.replace(/^\s+|\s+$/g,"");
}

// A cross-browser "To String" helper for xml node objects.
// Using console.dirxml() is an alternative way to inspect XML.
// Uses strict mode: https://goo.gl/xmOUmj
function xmlToString(node) {
  'use strict';

  if (node.xml) { // Only IE supports this property.
    return node.xml;
  } else if (XMLSerializer) { // Firefox supports this.
    var my_serializer = new XMLSerializer();
    return my_serializer.serializeToString(node);
  } else {
    alert('Your browser does not support XML serialization.');
    return '';
  }
}

// Synchronously loads the received XML document as a DOM Document object 
// and returns it.
// Uses strict mode: https://goo.gl/xmOUmj
function loadXML(filename) {
  'use strict';

  var xhttp;

  if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else { // Only really old browsers like IE6 need this:
    xhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // Note: Setting the third argument to false turns on synchronous
  // fetch mode, which is being phased out (deprecated).
  xhttp.open('GET', filename, false);
  xhttp.send();
  return xhttp.responseXML;
}

// Handles the load event of the document
function load()
{
  // load the xml doms
  //var newsXML = loadXML("xml/news.xml");
  var newsXML = loadXML("https://moneytech.github.io/webd/xml/news.xml");

  // obtain the root element in order to insert elements
  // in the appropriate places
  var newsRoot = newsXML.documentElement;

  var news     = document.getElementById("news");
  var articles = newsRoot.getElementsByTagName('article');

  var i = -1;

  while(articles[++i] !== undefined)
  {
    var title = articles[i].getElementsByTagName("title")[0].firstChild.nodeValue;
    var link  = articles[i].getElementsByTagName("link")[0].firstChild.nodeValue;

    var li = document.createElement("li");
    var a  = document.createElement("a");

    a.setAttribute("href", link);
    a.innerHTML = title;

    li.append(a);
    news.append(li);
  }
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load, false);
