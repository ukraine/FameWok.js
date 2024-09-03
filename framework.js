// Asynchronously copies the content of a specified HTML element to the clipboard.
async function copyDivContent(contentId) {
   // Get the element by its ID
   var element = document.getElementById(contentId);
 
   // Determine the content to copy: 
   // If the element is a TEXTAREA, get its value; otherwise, get the inner text.
   var copyText = element.tagName === 'TEXTAREA' ? element.value : element.innerText;
 
   // Replace any line breaks in the text with newline characters.
   var formattedText = copyText.replace(/\n/g, '\r\n');
 
   // Attempt to copy the formatted text to the clipboard.
   try {
     await navigator.clipboard.writeText(formattedText); 
 
     // Display a "copied" status message (if implemented).
     document.getElementById("copystatus" + contentId).style.display = "block"; 
     delayhideDiv("copystatus" + contentId, 2500); // Hide the status message after a delay.

   } catch (err) {
     // Log an error message if copying fails.
     console.error('Failed to copy text: ', err);
   }
}

// requires class

async function copyDivContent2(contentId, thisId, copiedStatusMessage) {
   // Get the elements by their IDs
   var copyLink = document.getElementById(thisId); 
   var element = document.getElementById(contentId);
   var copyLinkOriginalText = copyLink.innerText;

   // Determine the content to copy: 
   // If the element is a TEXTAREA, get its value; otherwise, get the inner text.
   var copyText = element.tagName === 'TEXTAREA' ? element.value : element.innerText;

   // Replace any line breaks in the text with newline characters.
   var formattedText = copyText.replace(/\n/g, '\r\n');

   // Attempt to copy the formatted text to the clipboard.
   try {
     await navigator.clipboard.writeText(formattedText); 

     // Change the button text to "Copied"
     copyLink.textContent = copiedStatusMessage;
     
     // Optionally, add a class to highlight the button
     copyLink.classList.add('copied');

     // Revert the button text after a short delay
     setTimeout(() => {
       copyLink.textContent = copyLinkOriginalText;
       copyLink.classList.remove('copied');
     }, 2000);

     console.log(copiedStatusMessage); 

   } catch (err) {
     // Log an error message if copying fails.
     console.error('Failed to copy text: ', err); 
   }
}


// Hides and removes an HTML element after a specified delay.
function showStatusRevertTextValue(elementId, timeoutMilliseconds = 2500) {
   // Use setTimeout to delay the hiding of the element.
   setTimeout(() => {
     var element = document.getElementById(elementId);
     if (element) {
       // Hide the element by setting its display property to 'none'.
       element.style.display = "none";
       
       // Remove the element from the DOM.
       element.parentNode.removeChild(element);
     }
   }, timeoutMilliseconds); // The delay time is specified in milliseconds.
}

// Hides and removes an HTML element after a specified delay.
function delayhideDiv(elementId, timeoutMilliseconds = 2500) {
   // Use setTimeout to delay the hiding of the element.
   setTimeout(() => {
     var element = document.getElementById(elementId);
     if (element) {
       // Hide the element by setting its display property to 'none'.
       element.style.display = "none";
       
       // Remove the element from the DOM.
       element.parentNode.removeChild(element);
     }
   }, timeoutMilliseconds); // The delay time is specified in milliseconds.
}



// Hides an HTML element by setting its display style to 'none'.
function closeDiv(id) {
   // Get the element by its ID and hide it by changing its display property.
   document.getElementById(id).style.display = 'none';
}

/// Toggles the visibility of an HTML element between 'block' and 'none'.
function showHideDiv(id) {
   // Get the element by its ID
   var element = document.getElementById(id);
   
   // Toggle the display property: if it's 'none', set it to 'block'; otherwise, set it to 'none'.
   element.style.display = (element.style.display === "none") ? "block" : "none";
}


function doFetch2(id, fieldsToChange, action, processor, statusElementId='status') {
   const statusElement = document.getElementById(statusElementId);
   statusElement.style.display = 'block';
   statusElement.innerHTML = "<span>Processing...</span>";

   // Split the string by the '=' character
const parts = fieldsToChange.split('=');

const statusValue = parts[1]; // "3"

  // Prepare the data to send
  const data = new URLSearchParams();
  data.append('id', id);
  data.append('fieldsToChange', fieldsToChange);
  data.append('action', action);

   fetch(processor, {
       method: 'POST',
       body: data,

       // action: action
       /* headers: {
           // Ensure that the server understands the character encoding
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       }, */
   })
   .then(response => response.json())
   .then(data => {
       const message = data.message;

       // statusElement.innerHTML = message + "<div><button onclick='closeDiv(\"status\")'>OK</button></div>";
       statusElement.classList.add("success");

       document.getElementById(statusElementId).innerHTML = statusValue;

   })
   .catch(error => {
       console.error('Error:', error);
       statusElement.innerHTML = "Error occurred.";
       statusElement.classList.add("error");
   });
}


// doAjax 2.0
function doFetch(i, processor, action, statusElementId='status') {
   const statusElement = document.getElementById(statusElementId);
   statusElement.style.display = 'block';
   statusElement.innerHTML = "<span>Processing...</span>";

   const formData = new FormData(document.forms[i]);

   fetch(processor, {
       method: 'POST',
       body: formData,
       /* headers: {
           // Ensure that the server understands the character encoding
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
       }, */
   })
   .then(response => response.json())
   .then(data => {
       const message = data.message;

       statusElement.innerHTML = message + "<div><button onclick='closeDiv(\"status\")'>OK</button></div>";
       statusElement.classList.add("success");

       document.getElementById("itemStatus" + i).innerHTML = formData.get("cellValue");

       if (action === "hide") {
           document.getElementById(i).style.display = 'none';
       }
   })
   .catch(error => {
       console.error('Error:', error);
       statusElement.innerHTML = "Error occurred.";
       statusElement.classList.add("error");
   });
}

   // Function to filter divs based on the search string
function filterDivs(classToSearch, blockOrInline, elementType) { 

  // Get the input element
  var input = document.getElementById('searchInput');

  // Get the value of the input
  var searchString = input.value.toLowerCase();

  console.log('Search string:', searchString);
 
  // Get all elements of the specified type within the specified class
  var contentElements = document.querySelectorAll(classToSearch);

  console.log('Number of elements to filter:', contentElements.length);
 
  // Loop through each element
  contentElements.forEach(function(element) {
     // Get the text content of the element and convert it to lowercase
     var elementText = element.textContent.toLowerCase();
 
     // Check if the element contains the search string
     if (elementText.includes(searchString)) {
        // If it does, display the element
        element.style.display = elementType === 'tr' ? '' : blockOrInline;
     } else {
        // If it doesn't, hide the element
        element.style.display = 'none';
     }
  });
}



   // Function to change the innerText and follow the link
function changeTextAndFollowLink(element, nameValueCopied) { 
   // Change the innerText
   element.innerText = nameValueCopied;

   // Get the href value
   const hrefValue = element.getAttribute('href');

   // Follow the link
   window.open(hrefValue, '_blank');
}
