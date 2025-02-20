document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    let isValid = true;

    // Define valid credentials
    const validUsername = "faculty";
    const validPassword = "faculty123";

    // Validate username
    if (username !== validUsername) {
      isValid = false;
      alert("username is invalid");
    }

    // Validate password
    if (password !== validPassword) {
      isValid = false;
      alert("password is invalid");
    }

    // If the form is valid, show a success message
    if (isValid) {
      window.location.assign("results.html");
    }
  });
