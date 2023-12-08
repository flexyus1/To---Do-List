// Carrega os dados do localStorage ao iniciar a página
document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage()
});

//Função para criar novas tasks
function addTask() {
  //cria uma nova task, e adiciona 1 no contador
  let newTask = document.getElementById("newTask")
  let inputValue = newTask.value
  let myList = document.getElementById("taskList")

  let newElement = document.createElement("li")
  newElement.textContent = inputValue
  myList.appendChild(newElement)
  //-----------------------------------------------------

  //muda o estado do botão de Finish, para Finished, e remove 1 do contador
  let btnFinish = document.createElement("button")
  btnFinish.textContent = "Finish"
  myList.appendChild(btnFinish)

  btnFinish.addEventListener("click", function () {
    newElement.classList.add("concluido")

    btnFinish.disabled = true
    btnFinish.textContent = "Finished"

    //salva as tarefas no local storage depois da conclusão
    saveTasksToLocalStorage()
  });
  //---------------------------------------------------------


  //remove 1 do contador apenas se ele não tiver o estado de finished, e exclui a task
  let btnRemove = document.createElement("button")
  btnRemove.textContent = "Remove"
  myList.appendChild(btnRemove)

  btnRemove.addEventListener("click", function () {
    myList.removeChild(newElement)
    myList.removeChild(btnFinish)
    myList.removeChild(btnRemove)

    saveTasksToLocalStorage()
  })

  myList.insertBefore(btnRemove, myList.firstChild)
  myList.insertBefore(btnFinish, myList.firstChild)
  myList.insertBefore(newElement, myList.firstChild)

  newTask.value = ""
  // Salva as tarefas após adicionar uma nova tarefa
  saveTasksToLocalStorage()
  //------------------------------------------------------------
}

// Função para salvar as tarefas no localStorage
function saveTasksToLocalStorage() {
  //cria um array vazio
  let tasks = []
  //pega os elementos li da task list
  let taskElements = document.querySelectorAll("#taskList li");

  //pega os elementos e coloca no array vazio que foi criado
  taskElements.forEach(function (element) {
  //checa se o botão finish foi acionado ou não
    let taskData = {
      content: element.textContent,
      finished: element.classList.contains("concluido")
    }
    tasks.push(taskData)
  });

  //guarda eles no local storage
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Função para carregar as tarefas do localStorage
function loadTasksFromLocalStorage() {
  //pega as tasks no local storage
  let storedTasks = localStorage.getItem("tasks")

//pega as tasks armazenas e cria os elemetos li novamente
  if (storedTasks) {
    let tasks = JSON.parse(storedTasks)
    tasks.forEach(function (taskData) {
      let myList = document.getElementById("taskList")


      let newElement = document.createElement("li")
      newElement.textContent = taskData.content
//---------------------------------------------------------------
//se o botão finish foi ativado, ele vai adicionar a classe concluido ao elemento
      if (taskData.finished) {
        newElement.classList.add("concluido")
      }
//----------------------------------------------------------------
//recria o botão finish checando se ele estava finalizado ou não
      let btnFinish = document.createElement("button")
      btnFinish.textContent = taskData.finished ? "Finished" : "Finish"
      btnFinish.disabled = taskData.finished

      btnFinish.addEventListener("click", function () {
        newElement.classList.add("concluido")
        btnFinish.disabled = true;
        btnFinish.textContent = "Finished"
        saveTasksToLocalStorage()
      });
//------------------------------------------------------------------
//recria o botão de remover e retira da local storage quando acionado
      let btnRemove = document.createElement("button")
      btnRemove.textContent = "Remove"

      btnRemove.addEventListener("click", function () {
        myList.removeChild(newElement)
        myList.removeChild(btnFinish)
        myList.removeChild(btnRemove)

        saveTasksToLocalStorage()
      })
//---------------------------------------------------------------------
//se o botão finish ja estiver acionado, ele serar recriado ao recarregar a página, desabilitado e acionado
      if (taskData.finished) {
        newElement.classList.add("concluido");
        btnFinish.disabled = true;
      }

      myList.appendChild(newElement)
      myList.appendChild(btnFinish)
      myList.appendChild(btnRemove)

    })
  }
}
