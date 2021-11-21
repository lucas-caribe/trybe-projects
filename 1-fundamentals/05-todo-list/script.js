const taskListId = '#lista-tarefas';

function createNewTask(text, classList = 'task') {
  const task = document.createElement('li');
  task.innerText = text;
  task.classList = classList;

  return task;
}

function saveToLocalStorage(tasksArray) {
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function retrieveFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  const taskList = document.querySelector(taskListId);

  if (storedTasks) {
    storedTasks.forEach((task) => {
      taskList.appendChild(createNewTask(task.text, task.classList));
    });
  }
}

function addTaskButtonEventListener() {
  const addTaskButton = document.querySelector('#criar-tarefa');

  addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    const textInput = document.querySelector('#texto-tarefa');

    if (textInput.value) {
      const taskList = document.querySelector(taskListId);

      taskList.appendChild(createNewTask(textInput.value));
      textInput.value = '';
    } else {
      alert('Sua tarefa precisa ter um texto descritivo!');
    }
  });
}

function addInputEventListener() {
  const textInput = document.querySelector('#texto-tarefa');
  const addTaskButton = document.querySelector('#criar-tarefa');

  textInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') addTaskButton.click();
  });
}

function addTaskSelectionEvent() {
  const taskList = document.querySelector(taskListId);

  taskList.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('task')) {
      const currentSelected = document.querySelector('.selected');

      if (currentSelected) {
        currentSelected.classList.remove('selected');
        target.classList.add('selected');
      } else {
        target.classList.add('selected');
      }
    }
  });
}

function addTaskCompletionEvent() {
  const taskList = document.querySelector(taskListId);

  taskList.addEventListener('dblclick', (event) => {
    const { target } = event;

    if (target.classList.contains('task')) {
      if (target.classList.contains('completed')) {
        target.classList.remove('completed');
      } else {
        target.classList.add('completed');
      }
    }
  });
}

function addClearListEvent() {
  const clearButton = document.querySelector('#apaga-tudo');

  clearButton.addEventListener('click', (event) => {
    event.preventDefault();

    const taskList = document.querySelector(taskListId);

    taskList.innerHTML = '';
  });
}

function addClearCompletedEvent() {
  const clearCompletedButton = document.querySelector('#remover-finalizados');

  clearCompletedButton.addEventListener('click', (event) => {
    event.preventDefault();

    const completedTasks = document.querySelectorAll('.completed');

    completedTasks.forEach((task) => task.remove());
  });
}

function addSaveTasksEvent() {
  const saveTasksButton = document.querySelector('#salvar-tarefas');

  saveTasksButton.addEventListener('click', (event) => {
    event.preventDefault();

    const tasks = document.querySelectorAll('.task');
    const tasksObjectArray = [];

    tasks.forEach((task) => {
      tasksObjectArray.push({
        text: task.innerText,
        classList: task.classList.value,
      });
    });

    saveToLocalStorage(tasksObjectArray);
  });
}

function addMoveUpEvent() {
  const moveUpButton = document.querySelector('#mover-cima');

  moveUpButton.addEventListener('click', (event) => {
    event.preventDefault();

    const currentSelected = document.querySelector('.selected');
    const taskList = document.querySelector(taskListId);

    if (currentSelected && currentSelected !== taskList.firstElementChild) {
      const previousItem = currentSelected.previousElementSibling;
      taskList.insertBefore(currentSelected, previousItem);
    }
  });
}

function addMoveDownEvent() {
  const moveDownButton = document.querySelector('#mover-baixo');

  moveDownButton.addEventListener('click', (event) => {
    event.preventDefault();

    const currentSelected = document.querySelector('.selected');
    const taskList = document.querySelector(taskListId);

    if (currentSelected && currentSelected !== taskList.lastElementChild) {
      const nextItem = currentSelected.nextElementSibling;
      taskList.insertBefore(nextItem, currentSelected);
    }
  });
}

function addRemoveSelectedEvent() {
  const removeSelectedButton = document.querySelector('#remover-selecionado');

  removeSelectedButton.addEventListener('click', (event) => {
    event.preventDefault();

    const currentSelected = document.querySelector('.selected');

    if (currentSelected) {
      currentSelected.remove();
    }
  });
}

window.onload = () => {
  retrieveFromLocalStorage();
  addTaskButtonEventListener();
  addInputEventListener();
  addTaskSelectionEvent();
  addTaskCompletionEvent();
  addClearListEvent();
  addClearCompletedEvent();
  addSaveTasksEvent();
  addMoveUpEvent();
  addMoveDownEvent();
  addRemoveSelectedEvent();
};
