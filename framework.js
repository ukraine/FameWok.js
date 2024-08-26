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
     document.getElementById("copystatus" + contentId).style.display = "inline"; 
     delayhideDiv("copystatus" + contentId); // Hide the status message after a delay.

   } catch (err) {
     // Log an error message if copying fails.
     console.error('Failed to copy text: ', err);
   }
}

// Hides and removes an HTML element after a specified delay.
function delayhideDiv(elementId, timeoutMilliseconds) {
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

// Toggles the visibility of an HTML element between 'block' and 'none'.
function showHideDiv(id) {
   // Get the element by its ID
   var element = document.getElementById(id);
   
   // Toggle the display property: if it's 'none', set it to 'block'; otherwise, set it to 'none'.
   element.style.display = (element.style.display === "none") ? "block" : "none";
}

