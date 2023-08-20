const toDoForm = document.getElementById('todo-form');
const toDoList = document.getElementById('todo-list');

const toDoInput = toDoForm.querySelector('input');
//const toDoInput = document.querySelector('#todo-form input');

const TODOS_KEY = 'todos';

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); //그냥  string 으로 -> 살아있는 배열로 하려면 parse() 필요
}

function deleteToDo(event) {
  const li = event.target.parentElement; // target(button)의 부모(parentElement)는 li -> 삭제해야함.
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const Li = document.createElement('li');
  Li.id = newTodo.id;
  const Span = document.createElement('span');
  Span.innerText = newTodo.text;
  const button = document.createElement('button');
  button.innerText = '◀';

  button.addEventListener('click', deleteToDo);

  Li.appendChild(Span);
  Li.appendChild(button);
  toDoList.appendChild(Li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  // parsedToDos.forEach((item) => console.log('this is turn off', item)); // 밑에 꺼랑 같다
  // parsedToDos.forEach(sayHello);
  //BUT,
  toDos = parsedToDos; //이전 값들을 잃어버리지 않게 저장
  parsedToDos.forEach(paintToDo); //paintToDo("a"),paintToDo("b"),paintToDo("c")
}
