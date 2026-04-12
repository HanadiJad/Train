const firebaseConfig = {
    apiKey: "AIzaSyDbMqY1YcCX0lWYMqcjp-TMtrJv-NDlIvg",
    authDomain: "daily-tasks-24ee1.firebaseapp.com",
    databaseURL: "https://daily-tasks-24ee1-default-rtdb.firebaseio.com",
    projectId: "daily-tasks-24ee1",
    storageBucket: "daily-tasks-24ee1.firebasestorage.app",
    messagingSenderId: "284926144437",
    appId: "1:284926144437:web:9cd813bd8073716a70b3fc"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const tasksRef = db.ref("tasks");

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];
let currentFilter = 'all';

tasksRef.on("value", snapshot => {
    tasks = [];
    snapshot.forEach(child => {
        tasks.push({ id: child.key, ...child.val() });
    });
    renderTasks();
});

addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    if (text === "") return;
    tasksRef.push({ text: text, completed: false, createdAt: Date.now() });
    taskInput.value = "";
});

taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addBtn.click();
});


document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

function renderTasks() {
    taskList.innerHTML = "";

    const filtered = tasks.filter(task => {
        if (currentFilter === 'done') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });

    if (filtered.length === 0) {
        taskList.innerHTML = `<p class="empty-msg">No tasks here yet.</p>`;
        updateStats();
        return;
    }

    filtered.forEach((task) => {
        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginTop = "10px";
        div.style.padding = "10px";
        div.style.background = "#4e8c9c54";
        div.style.borderRadius = "10px";
        div.style.alignItems = "center";

        div.innerHTML = `
            <span style="text-decoration:${task.completed ? 'line-through' : 'none'}; opacity:${task.completed ? '0.6' : '1'}">
                ${task.text}
            </span>
            <div>
                <button onclick="toggleTask('${task.id}')" class="${task.completed ? 'btn-undo' : 'btn-done'}">
                    ${task.completed ? "Undo" : "Done"}
                </button>
                <button onclick="deleteTask('${task.id}')" class="btn-delete">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(div);
    });

    updateStats();
}

function deleteTask(id) {
    tasksRef.child(id).remove();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) tasksRef.child(id).update({ completed: !task.completed });
}

function updateStats() {
    const total = tasks.length;
    const done = tasks.filter(t => t.completed).length;
    document.getElementById("totalCount").textContent = total;
    document.getElementById("doneCount").textContent = done;
    document.getElementById("pendingCount").textContent = total - done;
}