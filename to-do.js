// Select Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

// Store Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display Tasks
function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(filter === "active"){
            return !task.completed;
        }

        if(filter === "completed"){
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach((task, index) => {

        // Create List Item
        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        // Task Text
        li.innerHTML = `
            <span>${task.text}</span>

            <div>

                <button onclick="toggleTask(${index})">
                    ✔
                </button>

                <button onclick="deleteTask(${index})">
                    ✖
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

// Add Task
addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter task");
        return;
    }

    // Add Task Object
    tasks.push({
        text:text,
        completed:false
    });

    saveTasks();

    taskInput.value = "";

    renderTasks();
});

// Toggle Complete
function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();
}

// Delete Task
function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

// Save to localStorage
function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// Filter Buttons
filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        const filter =
        btn.getAttribute("data-filter");

        renderTasks(filter);
    });
});

// Initial Render
renderTasks();