document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {  /*Obtiene la funcion guardar tareas */
  let title = document.getElementById('title').value;  /*Selecciona el valor de tittle */
  let description = document.getElementById('description').value; /*Selecciona el valor de description */
  console.log(description) /*Mostrar description */

  let task = {
    title,
    description
  };

  if(localStorage.getItem('tasks') === null) {        /*Si localStorage ya existe un valor de tarea y es igual a null, empezaria a crear a tareas*/
    let tasks = [];     
    tasks.push(task); 
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {          /*Si ya existe valores entonces se actualizarian*/ 
    let tasks = JSON.parse(localStorage.getItem('tasks'));  /*Obtiene las tareas de localstorage y las almacena en una variable*/
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));  /*Almacena nuevamente */
  }

  getTasks();
  document.getElementById('formTask').reset(); /*Una vez que ya este reseteado el formulario este finalizaria el proceso de almacenar datos*/ 
  e.preventDefault();
}

function deleteTask(title) {   /*Obtiene borrar tareas */
  console.log(title)
  let tasks = JSON.parse(localStorage.getItem('tasks')); /*Lo almacena en una variable llamada tareas */
  for(let i = 0; i < tasks.length; i++) { /*Recorre las tareas mediante ciclo for */
    if(tasks[i].title == title) { /*Si las tareas en el indice i en la propiedad tittle es igual a la tarea que me pasa la funcion  ya encontraria una tarea que coincide */
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {           /*Obtiene las tareas */
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) { /*Recorre el arreglo de tareas */
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
