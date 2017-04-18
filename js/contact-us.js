// Fields
var fields = ["name", "phone", "email", "comments"];

// Removes white space from a string value.
function trim(str) 
{
  // Uses a regex to remove spaces from a string.
  return str.replace(/^\s+|\s+$/g,"");
}

// Validate fields form
function validateForm(e)
{
  // Focus flag
  var okFlag = true;

  // Clear all error messages
  hideErrors();

  for ( var i = 0; i < fields.length; i++ )
  {
    var field = document.getElementById("f_"+fields[i]);

    if ( !trim(field.value) )
    {
      // Show error message
      document.getElementById("e_"+fields[i]).style.display = "block";

      // Set focus on field
      if ( okFlag )
      {
        field.focus();
        field.select();
        okFlag = false;
      }
    }
    else
    {
      switch( fields[i] )
      {
        case "phone":
          var regexp = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

          if ( !regexp.test(field.value) )
          {
            document.getElementById("e_"+fields[i]).style.display = "block";

            if ( okFlag )
            {
              field.focus();
              field.select();
              okFlag = false;
            }
          }
          break;

        case "email":
          var regexp = new RegExp(/\S+@\S+\.\S+/);

          if ( !regexp.test(field.value) )
          {
            document.getElementById("e_"+fields[i]).style.display = "block";

            if ( okFlag )
            {
              field.focus();
              field.select();
              okFlag = false;
            }
          }
          break;
      }
    }
  }

  if ( !okFlag )
  {
  // Do not submit anything, some error happens
  e.preventDefault();
  }

  return okFlag;
}

// Reset the form
function resetForm(e)
{
  // Clear all error messages
  hideErrors();

  // Focus on the first field
  document.getElementById("f_"+fields[0]).focus();

  return true;
}

// Hides all of the error elements
function hideErrors()
{
  for ( var i = 0; i < fields.length; document.getElementById("e_"+fields[i++]).style.display = "none" );
}

// Handles the load event of the document
function load()
{
  // Reset the form
  document.getElementById("form").reset();

  // Subscribe events to submit and reset buttons in the form
  document.getElementById("form").addEventListener("submit", validateForm, false);
  document.getElementById("form").addEventListener("reset", resetForm, false);

  // Clear all error messages
	hideErrors();

  // Focus on the first field
  document.getElementById("f_"+fields[0]).focus();
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load, false);
