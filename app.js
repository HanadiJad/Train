const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();

    if (text === "") return;

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";

    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginTop = "10px";
        div.style.padding = "10px";
        div.style.background = "#4e8c9c54";
        div.style.borderRadius = "10px";
        div.style.alignItems = "center";

        div.innerHTML = `
            <span>${task.text}</span>

            <div>
                <button onclick="doneTask(${index})" class="btn-done">
                    Done
                </button>

                <button onclick="deleteTask(${index})" class="btn-delete">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(div);
    });
}