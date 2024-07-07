const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

const incorrectMsg = document.getElementById("incorrect");

var users = []
var userInfo;
var correctSignUp = false;

let regex = {
    signupName: {
        value: /^[a-z\s]{3,15}$/,
        invalidMsg: "Name must begin with char and between 3 to 15 letter!"
    },
    signupEmail: {
        value: /^[a-zA-Z0-9.!#_-]+@(yahoo|google|gmail|skype|hotmail|outlook)\.com$/,
        invalidEmailMsg: "Invalid Email!",
        emailDoesNotExistMsg: "This Email Doesn't Exist!",
        emailExistMsg:"This Email Already has an Account!"
    },
    signupPassword: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        invalidPasswordMsg: "Invalid Password! The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters!",
        wrongPasswordMsg: "Sorry, wrong Password!"
    }
}

if (localStorage.getItem('users') == null) {
    users = []
} else {
    users = JSON.parse(localStorage.getItem('users'))
}

var username = sessionStorage.getItem('sessionUsername')

if (username) {
    welcomePage(username)
}

function updateLocalStorage(){
    localStorage.setItem("users", JSON.stringify(users));
}

function welcomePage(userName){
    document.querySelector("body").innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark box-shadow">
            <div class="container mx-5">
                <a class="navbar-brand" href="#">SMART LOGIN</a>
                <button class="navbar-toggler" type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse"
                    id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto border-1 border-warning">
                        <li class="nav-item">
                            <a class="nav-link btn btn-outline-warning"
                                href="index.html" onclick="logout()">Logout</a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

        <div
            class="container my-5 text-center h-100 d-flex align-items-center align-content-center">
            <div
                class="card mb-3 bg-main-color text-white p-5 w-75 m-auto rounded-0 box-shadow">
                <h1>Welcome ${userName}</h1>
            </div>
        </div>
    `
}

function clearForm(){
    signupName.value = null;
    signupEmail.value = null;
    signupPassword.value = null;
    loginEmail.value = null;
    loginPassword.value = null;
    
}

function successClass(msg){
    incorrectMsg.classList.add("text-success");
    incorrectMsg.classList.remove("text-danger");
    incorrectMsg.classList.remove("text-warning");
    incorrectMsg.classList.remove("d-none");
    incorrectMsg.innerText= msg
}
function dangerClass(msg,appendFlag){
    incorrectMsg.classList.remove("text-success");
    incorrectMsg.classList.add("text-danger");
    incorrectMsg.classList.remove("text-warning");
    incorrectMsg.classList.remove("d-none");
    if(appendFlag){
        incorrectMsg.innerText += '\n' + msg;
    }else{
        incorrectMsg.innerText= msg;
    }
}
function warningClass(msg){
    incorrectMsg.classList.remove("text-success");
    incorrectMsg.classList.remove("text-danger");
    incorrectMsg.classList.add("text-warning");
    incorrectMsg.classList.remove("d-none");
    incorrectMsg.innerText= msg
}

function checkUserEmailInDatabase(email){
    for (let index = 0; index < users.length; index++) {
        userEmail = users[index].email;
        if (email.toLowerCase() == userEmail.toLowerCase()) {
            correctSignUp = false;
            userInfo = users[index]
            return
        }
    }
}

function checkUserPasswordInDb(user){
    return loginPassword.value == user.password? true : false
}

function signup(){
    dangerClass('', false)
    let name = signupName.value;
    let email = signupEmail.value;
    let password = signupPassword.value;

    if(name == "" | !regex.signupName.value.test(name)){
        dangerClass(regex.signupName.invalidMsg, false)
    }
    if(email == "" | !regex.signupEmail.value.test(email)){
        dangerClass(regex.signupEmail.invalidEmailMsg, true)
    }
    if(password == ""| !regex.signupPassword.value.test(password)){
        dangerClass(regex.signupPassword.invalidPasswordMsg,true)
        return
    }

    checkUserEmailInDatabase(email)
    if(name != "" && email !="" && password !=""){
        if(correctSignUp){
            var user = {
                id: users.length,
                name: name,
                email: email,
                password: password
            }
            users.push(user);
            successClass("Successfully Created")
            updateLocalStorage();
            clearForm();
            correctSignUp = false;
        }else{
            warningClass(regex.signupEmail.emailExistMsg)
        }
    }else{
        dangerClass("Invalid Information",false)
    }
}

function login(){
    dangerClass('', false)
    let email = loginEmail.value;
    let password = loginPassword.value;
    if(email == "" | !regex.signupEmail.value.test(email)){
        dangerClass(regex.signupEmail.invalidEmailMsg, false)
    }
    if(password == ""){
        dangerClass(regex.signupPassword.wrongPasswordMsg, true)
        return
    }

    checkUserEmailInDatabase(email)
    if (userInfo == undefined){
        warningClass(regex.signupEmail.emailDoesNotExistMsg)
    }else{
        if(checkUserPasswordInDb(userInfo)){
            successClass("login Successfully")
            welcomePage(userInfo.name)
            sessionStorage.setItem('sessionUsername', userInfo.name)
        }
        else{
            dangerClass(regex.signupPassword.wrongPasswordMsg, false)
        }
    }
}

function validateUserInput(element){
    if(regex[element.id].value.test(element.value)==true && element.value != ""){
        correctSignUp = true;
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    }else{
        correctSignUp = false;
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

function logout() {
    sessionStorage.removeItem('sessionUsername')
}