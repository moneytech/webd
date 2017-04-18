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

// Build HTML elements
function buildHTML(xmlName, xmlItem, htmlElem)
{
  // load the xml doms
  var xml = loadXML(xmlName);

  // obtain the root element in order to insert elements
  // in the appropriate places
  var root = xml.documentElement;

  var elem  = document.getElementById(htmlElem);
  var items = root.getElementsByTagName(xmlItem);

  var i = -1;

  while(items[++i] !== undefined)
  {
    var name        = items[i].getElementsByTagName("name")[0].firstChild.nodeValue;
    var description = items[i].getElementsByTagName("description")[0].firstChild.nodeValue;
    var image       = items[i].getElementsByTagName("image")[0].firstChild.nodeValue;

    var li  = document.createElement("li");
    var h3  = document.createElement("h3");
    var p   = document.createElement("p");
    var img = document.createElement("img");

    h3.innerHTML = name;
    p.innerHTML  = description;
    img.setAttribute("src", image);
    img.setAttribute("alt", name);

    li.append(h3);
    li.append(p);
    li.append(img);
    elem.append(li);
  }
}

// Handles the load event of the document
function load()
{
  // buildHTML("xml/products.xml", "product", "products");
  // buildHTML("xml/services.xml", "service", "services");
  buildHTML("https://moneytech.github.io/webd/xml/products.xml", "product", "products");
  buildHTML("https://moneytech.github.io/webd/xml/services.xml", "service", "services");
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load, false);
