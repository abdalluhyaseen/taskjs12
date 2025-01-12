
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginBtn");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");

    loginButton.addEventListener("click", (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let isValid = true;
        if (!emailRegex.test(email)) {
            emailError.textContent = "Invalid email. Please enter a valid email address.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }
        if (!passwordRegex.test(password)) {
            passwordError.textContent =
                "Password must be at least 8 characters long, contain at least one number, and one special character.";
            isValid = false;
        } else {
            passwordError.textContent = "";
        }

        if (isValid) {
            const username = email.split("@")[0];
            localStorage.setItem("username", username);
            alert(`Welcome, ${username}!`);
            window.location.href = "index.html"; 
        }
    });
});
