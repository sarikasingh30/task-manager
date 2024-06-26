const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

async function showTasks() {
  loadingDOM.style.visibility = "visible";
  try {
    let data = await fetch("/api/v1/tasks").then((res) => res.json());
    console.log(data);
    if (data.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const all = data
      .map((task) => {
        const { completed, _id: taskID, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
                    <div class="headNo"> <h5>    <span>o  </span>${name} </h5></div>
                    <div class="task-links">
                    <!-- edit link -->
                        <a href="task.html?id=${taskID}"  class="edit-link">
                             Edit 
                        </a>
                    <!-- delete btn -->
                        <button type="button" class="delete-btn" data-id="${taskID}" onclick="deleteTask('${taskID}')">
                            Delete
                        </button>
                    
                    </div>
                </div>`;
      })
      .join("");
    tasksDOM.innerHTML = all;
  } catch (error) {
    tasksDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
}

showTasks();

// delete task =>   functionality /api/tasks/:id

async function deleteTask(id) {
  console.log(id);
  try {
    await fetch(`/api/v1/tasks/${id}`, { method: "DELETE" });
    showTasks();
  } catch (error) {
    console.log(error);
  }

  loadingDOM.style.visibility = "hidden";
}

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = taskInputDOM.value;
  const res = {
    name: name,
    completed: false,
  };
  try {
    await fetch(`/api/v1/tasks`, {
      method: "POST",
      body: JSON.stringify(res),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
    // console.log(data);
    
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, task added`;
    formAlertDOM.classList.add("text-success");
    showTasks();
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});
