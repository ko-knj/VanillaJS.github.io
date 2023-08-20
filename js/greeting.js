const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');

const HIDDEN_CALSSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CALSSNAME);
  const value_of_username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, value_of_username);
  paintGreetings(value_of_username);
}

function paintGreetings(value_of_username) {
  greeting.innerText = `Hello ${value_of_username}`;
  greeting.classList.remove(HIDDEN_CALSSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername == null) {
  loginForm.classList.remove(HIDDEN_CALSSNAME);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
