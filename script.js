// Get the form elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const output = document.getElementById("output");

// Add an event listener to the form
form.addEventListener("submit", (event) => {
  // Prevent the default form behavior
  event.preventDefault();
  // Get the input value
  const word = input.value.trim();
  // Check if the input is not empty
  if (word) {
    // Disable the button and show a loading message
    button.disabled = true;
    output.innerHTML = "Loading...";
    // Fetch the dictionary data from an API
    fetch(`http://localhost:8000/search?word=${word}`)
      .then((response) => response.json())
      .then((data) => {
        // Check if the data is an array
        if (Array.isArray(data) && data.length > 0) {
          // Create a HTML string to display the dictionary data
          let html = "";
          
          // Iterate over each entry in the data array
          data.forEach((entry) => {
            const word = entry.Ibani;
            const partOfSpeech = entry.Pos;
            const definition = entry.Meaning;

            html += `<div class="entry">`;
            html += `<p><strong>Word:</strong> ${word}</p>`;
            html += `<p><strong>Part of speech:</strong> ${partOfSpeech}</p>`;
            html += `<p><strong>Definition:</strong> ${definition}</p>`;
            html += `</div><hr>`;
          });

          // Update the output element with the HTML string
          output.innerHTML = html;
        } else {
          // If the data is an empty array, show an error message
          output.innerHTML = "Sorry, no results found.";
        }
      })
      .catch((error) => {
        // If there is an error, show an error message
        output.innerHTML = "Sorry, something went wrong.";
      })
      .finally(() => {
        // Enable the button
        button.disabled = false;
      });
  } else {
    // If the input is empty, show an error message
    output.innerHTML = "Please enter a word.";
  }
});
