const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskidLab = document.querySelector('#idVAl')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName
// console.log(id)
// taskidLab.innerText=id
const showTask = async () => {
  try {
    const data= await fetch(`/api/v1/tasks/${id}`).then((res)=>res.json())
    const { _id: taskID, completed, name } = data.task
    // console.log(taskID,name,completed)
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked
    const res={
      name:taskName,
      completed:taskCompleted
    }
   const data=await fetch(`/api/v1/tasks/${id}`, { method: 'PATCH',
   body: JSON.stringify(res),
   headers: {
     'Content-type': 'application/json; charset=UTF-8',
   },
 }).then((response) => response.json())
 console.log(data.task)
    const { _id: taskID, completed, name } = data.task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})