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
        div.style.borderRadius = "10px"
        div.style.alignItems= "center";

        div.innerHTML = `
                <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">
                    ${task.text}
                </span>

                <div>
                    <button onclick="toggleTask(${index})" class="${task.completed ? 'btn-undo' : 'btn-done'}">
                        ${task.completed ? "Undo" : "Done"}
                    </button>

                    <button onclick="deleteTask(${index})" class="btn-delete">
                        Delete
                    </button>
                </div>
        `;         
        taskList.appendChild(div);
    });
        updateStats();
};

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}
