//fazendo uma lista de tarefas
let elementStatus = document.getElementById("status")
let elementNumber = 0

function addTask() {
  //pegando o elemento pelo seu ID no código HTML
  let newTask = document.getElementById("newTask")

  //fazendo com que o valor do input seja igual a oq foi escrito no input
  let inputValue = newTask.value

  //faz com que seja criado um novo elemento li
  let newElement = document.createElement("li")

  //pega o que foi escrito no inputValue, e tranforma em texto
  newElement.textContent = inputValue

  //adiciona 1 a contagem de tarefas pendentes
  elementNumber++
  taskNumber()

  //pega o id da minha lista, e cria um elemento nela
  //OBS: sempre que for fazer algo para criar na lista, usar o appendChild COM o myList
  let myList = document.getElementById("taskList")
  myList.appendChild(newElement)

  //cria um botão de concluir na lista
  let btnFinish = document.createElement("button")
  btnFinish.textContent = "Finish"
  
  myList.appendChild(btnFinish)

  btnFinish.addEventListener("click", function(){
    newElement.classList.add("concluido")

    //se a tarefa for concluida, ele remove 1 de tarefas pendentes
    if(newElement.classList.contains("concluido")){
      //desativa o botão assim que a tarefa for marcada como concluida
      btnFinish.disabled = true

      //muda a cor do botão para verde quando a tarefa for finalizada
      btnFinish.classList.add("btnVerde")

      btnFinish.textContent = "Finished"
      //atualiza o valor de tarefas pendentes
      elementNumber--
      taskNumber()
    }
    
  })

  //cria um botão de remover na lista
  let btnRemove = document.createElement("button")
  btnRemove.textContent = "Remove"
  myList.appendChild(btnRemove)

  
  //remove todos os elementos da "li" quando clicar em Remove
  btnRemove.addEventListener("click", function(){
    myList.removeChild(newElement)
    myList.removeChild(btnFinish)
    myList.removeChild(btnRemove)

    //Se o elemento não tiver a classe concluido, ele ira retirar o elemento, e 1 numero
    if(!newElement.classList.contains("concluido")){
      elementNumber--
      taskNumber()
    }

  })

  //faz com que os novos elementos fiquem em cima, na respectiva ordem em que foram escritos
  myList.insertBefore(btnRemove, myList.firstChild)
  myList.insertBefore(btnFinish, myList.firstChild)
  myList.insertBefore(newElement, myList.firstChild)

  //faz com que a caixa de input se limpe automaticamente depois de criar uma nova tarefa
  newTask.value = ""
}

function taskNumber() {
  elementStatus.textContent = `Pending Tasks: ${elementNumber}`
}