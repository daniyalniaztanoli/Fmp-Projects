const firebaseConfig = {
    apiKey: "AIzaSyC5oxlDRmLcGLTOzvooDBwZ18uU_N1V3CI",
    authDomain: "todoapp-c7f47.firebaseapp.com",
    databaseURL: "https://todoapp-c7f47-default-rtdb.firebaseio.com",
    projectId: "todoapp-c7f47",
    storageBucket: "todoapp-c7f47.appspot.com",
    messagingSenderId: "89489072272",
    appId: "1:89489072272:web:de63ec6f3351f5126af815"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();


  function sendDataToFirebase(tasks) {
    // Get a reference to the "tasks" node in the database
    const tasksRef = database.ref("tasks");
  
    // Set the data in the database
    tasksRef.set(tasks);
  }
  
function addtodo() {
    var input = document.getElementById("input");

    if (input.value === "") {
        alert("Enter Your Task");
        return;
    }

    var liElement = document.createElement("li");
    var liText = document.createTextNode(input.value);

    liElement.appendChild(liText);

    var list = document.getElementById("list");
    list.appendChild(liElement);

    input.value = "";

    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.classList.add("deletebutton");
    delBtn.setAttribute("onClick", "deleteItem(this)");
    delBtn.appendChild(delText);
    liElement.appendChild(delBtn);

    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit");
    editBtn.classList.add("editbutton");
    editBtn.setAttribute("onClick", "editItem(this)");
    editBtn.appendChild(editText);
    liElement.appendChild(editBtn);

    saveToLocalStorage();  // Save to local storage after adding a task
}

function deleteAll() {
    var list = document.getElementById("list");
    list.innerHTML = "";

    localStorage.removeItem("todoList");  // Clear local storage
}

function deleteItem(x) {
    x.parentNode.remove();
    saveToLocalStorage();  // Save to local storage after deleting a task
}

function editItem(e) {
    var item = prompt("Edit your Task:");
    e.parentNode.firstChild.nodeValue = item;
    saveToLocalStorage();  // Save to local storage after editing a task
}

function saveToLocalStorage() {
    var tasks = [];
    var listItems = document.querySelectorAll("#list li");

    listItems.forEach(function (item) {
        tasks.push(item.firstChild.nodeValue);
    });

    localStorage.setItem("todoList", JSON.stringify(tasks));
    // data sent
    firebase.database().ref("tasks").set(tasks);
}

function loadFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem("todoList")) || [];
    var list = document.getElementById("list");

    tasks.forEach(function (task) {
        var liElement = document.createElement("li");
        var liText = document.createTextNode(task);
        liElement.appendChild(liText);

        var delBtn = document.createElement("button");
        var delText = document.createTextNode("Delete");
        delBtn.classList.add("deletebutton");
        delBtn.setAttribute("onClick", "deleteItem(this)");
        delBtn.appendChild(delText);
        liElement.appendChild(delBtn);

        var editBtn = document.createElement("button");
        var editText = document.createTextNode("Edit");
        editBtn.classList.add("editbutton");
        editBtn.setAttribute("onClick", "editItem(this)");
        editBtn.appendChild(editText);
        liElement.appendChild(editBtn);

        list.appendChild(liElement);
    });
}

function displayDate() {
    var date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3];
}

window.onload = function () {
    displayDate();
    loadFromLocalStorage();
};
