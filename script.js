const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

inputBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  // Check if the Enter key is pressed
        addTask();  // Call the addTask function
    }
});

function addTask() {
    const taskText = inputBox.value.trim(); // Trim to remove any leading/trailing spaces

    if (taskText === '') {
        alert("Input field is empty");
    } else {
        // Check for duplicate tasks
        const tasks = listContainer.querySelectorAll("li");
        let isDuplicate = false;
        
        tasks.forEach(task => {
            if (task.textContent.replace("\u00d7", "").trim() === taskText) {
                isDuplicate = true;
            }
        });

        if (isDuplicate) {
            alert("Task already exists");
        } else {
            let li = document.createElement("li");
            li.innerHTML = taskText;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            saveData();
        }
    }
    inputBox.value = '';
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
