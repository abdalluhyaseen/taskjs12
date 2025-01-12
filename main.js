document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const passwordInput = document.getElementById("password");
    const passwordError = document.createElement("small");
    passwordError.classList.add("text-danger");

    if (loginForm) {
        passwordInput.parentNode.appendChild(passwordError);

        loginForm.addEventListener("submit", (event) => {
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
                window.location.href = "index.html";
            }
        });
    } else {
        const username = localStorage.getItem("username") || "User";


        const taskInput = document.getElementById("taskinput");
        const addBtn = document.getElementById("addTask");
        const taskList = document.getElementById("taskList");
        const deleteCheckedBtn = document.getElementById("deleteChecked");

        addBtn.addEventListener("click", addTask);
        taskInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") addTask();
        });
        deleteCheckedBtn.addEventListener("click", deleteCheckedTasks);

        function addTask() {
            const inputTask = taskInput.value.trim();
            if (inputTask === "") {
                alert("Please enter a task.");
                return;
            }

            const listItem = document.createElement("li");
            listItem.classList.add("task-item", "d-flex", "align-items-center", "mb-3");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("form-check-input", "me-2");

            const span = document.createElement("span");
            span.textContent = inputTask;
            span.classList.add("task-text", "flex-grow-1");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("btn", "btn-warning", "me-2");
            editBtn.addEventListener("click", () => editTask(span));

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.classList.add("btn", "btn-success", "me-2");
            completeBtn.addEventListener("click", () => toggleComplete(span));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("btn", "btn-danger");
            deleteBtn.addEventListener("click", () => listItem.remove());

            listItem.append(checkbox, span, editBtn, completeBtn, deleteBtn);
            taskList.appendChild(listItem);
            taskInput.value = "";
        }

        function editTask(taskText) {
            const currentText = taskText.textContent;
            const input = document.createElement("input");
            input.type = "text";
            input.value = currentText;
            input.classList.add("form-control", "me-2");

            taskText.replaceWith(input);

            input.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    const newText = input.value.trim();
                    if (newText) {
                        taskText.textContent = newText;
                        input.replaceWith(taskText);
                    }
                }
            });
        }

        function toggleComplete(taskText) {
            taskText.classList.toggle("completed");
        }

        function deleteCheckedTasks() {
            const tasks = taskList.querySelectorAll("li input:checked");
            tasks.forEach(task => task.parentElement.remove());
        }
    }
});
