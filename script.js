const inputbox=document.getElementById('inputbox');
const addbtn=document.getElementById('addbtn');
const todolist=document.getElementById('todolist');

let edittodo=null;
// function to add todo
const addtodo=()=>{
    const inputtext=inputbox.value.trim();
    if(inputtext.length<=0 ){
        alert("you must write something in your to do list ");
        return false;
    }

    if(addbtn.value==="Edit"){
        editlocaltodos(edittodo.target.previousElementSibling.innerHTML);
        edittodo.target.previousElementSibling.innerHTML=inputtext;
        addbtn.value="Add";
        inputbox.value="";
        edittodo=null;
    }
    else{
        // creating a p tag
        const li=document.createElement("li");
        const p=document.createElement("p");
        p.innerHTML=inputtext;
        li.appendChild(p);

        const Edit=document.createElement("button");
        Edit.innerText="Edit";
        Edit.classList.add("btn","editbtn");
        li.appendChild(Edit);

        const deltebtn=document.createElement("button");
        deltebtn.innerText="Remove";
        deltebtn.classList.add("btn","deletebtn");
        li.appendChild(deltebtn);


        todolist.appendChild(li);
        inputbox.value="";
    
        savelocoltodos(inputtext);
        inputbox.value="";
    }
   
}
// function to  edit and update
const updatetodo=(e)=>{
    // console.log(e.target.innerHTML);
    if(e.target.innerHTML=== "Remove"){
        todolist.removeChild(e.target.parentElement);
        deletelocaltodos(e.target.parentElement);
       
    }
    if(e.target.innerHTML==="Edit"){
        inputbox.value=e.target.previousElementSibling.innerHTML;
        inputbox.focus();
        addbtn.value="Edit";
        edittodo=e;
    }

}

const savelocoltodos=(todo) =>{
    let todos=[];
    if(localStorage.getItem("todos") ===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
   
    todos.push(todo);
    // console.log(todos);
    localStorage.setItem("todos",JSON.stringify(todos));

}

const getlocaltodos =()=>{
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo =>{
            const li=document.createElement("li");
            const p=document.createElement("p");
            p.innerHTML=todo;
            li.appendChild(p);
    
            const Edit=document.createElement("button");
            Edit.innerText="Edit";
            Edit.classList.add("btn","editbtn");
            li.appendChild(Edit);
    
            const deltebtn=document.createElement("button");
            deltebtn.innerText="Remove";
            deltebtn.classList.add("btn","deletebtn");
            li.appendChild(deltebtn);
            todolist.appendChild(li);

        });
    }
}

const deletelocaltodos =(todo)=>{
    let todos;
    if(localStorage.getItem("todos")=== null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    let todotext=todo.children[0].innerHTML;
    let todoindex=todos.indexOf(todotext);
    //  Array function slice/splice
    todos.splice(todoindex,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    console.log(todoindex);
}
const editlocaltodos=(todo)=>{
    let todos=JSON.parse(localStorage.getItem("todos"));
    let todoindex=todos.indexOf(todo);
    todos[todoindex]=inputbox.value;
    localStorage.setItem("todos",JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getlocaltodos);
addbtn.addEventListener('click',addtodo);
todolist.addEventListener('click',updatetodo)
