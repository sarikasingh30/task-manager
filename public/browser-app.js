const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')


async function showTasks(){
    loadingDOM.style.visibility = 'visible'
    try {
        let data=await fetch("/api/v1/tasks")
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

showTasks()