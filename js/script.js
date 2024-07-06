const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

const incorrectMsg = document.getElementById("incorrect");

var users = []
var correct = false;

let regex = {
    name: {
        value: /^[a-z]{3,15}$/,
        invalidMsg: "Name must begin with char and between 3 to 15 letter!"
    },
    email: {
        value: /^[a-zA-Z0-9.!#_-]+@(yahoo|google|gmail|skype|hotmail|outlook)\.com$/,
        invalidEmailMsg: "Invalid Email!",
        emailDoesNotExistMsg: "This Email Doesn't Exist!",
        emailExistMsg:"This Email Already has an Account!"
    },
    password: {
        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        invalidPasswordMsg: "Invalid Password! The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
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
    localStorage.setItem("user", JSON.stringify(user));
}

function loginPage(){
    document.querySelector("body").innerHTML = `
    <div class="container my-5 text-center">
        <div
            class="card mb-3 bg-main-color text-white p-5 w-75 m-auto rounded-0 box-shadow">
            <h1>Smart Login System</h1>
            <div class="card-body">
                <input class="form-control mb-3 text-white" type="email"
                    id="email" placeholder="Enter your Email">
                <input class="form-control mb-3 text-white" type="password"
                    id="password" placeholder="Enter your Password">
                <p id="incorrect"></p>

                <button type="button" onclick="login()"
                    class="btn btn-outline-info w-100 mb-3">Login</button>

                <p class="text-white">Don’t have an account? <a
                        class="text-white" href="signup.html">Sign
                        Up</a>
                </p>
            </div>
        </div>
    </div>
    `
}

function SignUpPage(){
    document.querySelector("body").innerHTML = `
    <div class="container my-5 text-center">
        <div
            class="card mb-3 bg-main-color text-white p-5 w-75 m-auto rounded-0 box-shadow">
            <h1>Smart Login System</h1>
            <div class="card-body">
                <input class="form-control mb-3 text-white" type="text"
                    id="name" placeholder="Enter your Name">
                <input class="form-control mb-3 text-white" type="email"
                    id="email" placeholder="Enter your Email">
                <input class="form-control mb-3 text-white" type="password"
                    id="password" placeholder="Enter your Password">

                <p id="incorrect"></p>

                <button type="button" onclick="signup()"
                    class="btn btn-outline-info w-100  mb-3">Sign
                    Up</button>

                <p class="text-white">Don’t have an account? <a
                        class="text-white" href="/">Login</a>
                </p>
            </div>
        </div>
    </div>
    `
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
                                href="/" onclick="logout()">Logout</a>
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

function clearlogin(){
    loginEmail.value = null;
    loginPassword.value = null;
}

function clearSignUp(){
    signupName.value = null;
    signupEmail.value = null;
    signupPassword.value = null;
}

function successClass(msg){
    incorrectMsg.classList.add("text-success");
    incorrectMsg.classList.remove("text-danger");
    incorrectMsg.classList.remove("text-warning");
    incorrectMsg.innerText= msg
}
function dangerClass(msg){
    incorrectMsg.classList.remove("text-success");
    incorrectMsg.classList.add("text-danger");
    incorrectMsg.classList.remove("text-warning");
    incorrectMsg.innerText= msg
}
function warningClass(msg){
    incorrectMsg.classList.remove("text-success");
    incorrectMsg.classList.remove("text-danger");
    incorrectMsg.classList.add("text-warning");
    incorrectMsg.innerText= msg
}


function checkUserEmailInDatabase(email){
    var searchedUser = {}
    for (let index = 0; index < users.length; index++) {
        item = users[index].email;
        if (item.toLowerCase().includes(email.toLowerCase())) {
            searchedUser = users[index]
            break
        }
    }
    return searchedUser
}

function checkUserPasswordInDb(user){
    if(loginPassword.value == user.password){
        console.log("right Password");
        return true;
    }else{
        console.log("wrong Password");
        return false;
    }
}


function signup(){
    if(checkUserEmailInDatabase(signupEmail.value)!= undefined){
        console.log(regex.semail.emailExistMsg);
        warningClass(regex.email.emailExistMsg)
    }
    if(correct){
        var user = {
            id: users.length,
            name: signupName.value,
            email: signupEmail.value,
            password:signupPassword.value
        }
        console.log(user);
        users.push(user);
        successClass("Successfully Created")
        updateLocalStorage();
        clearSignUp();
    }else{
        console.log("invalid");
        dangerClass("Invalid Information")
    }
}


function login(){
    let UserInfo = checkUserEmailInDatabase(loginEmail.value)
    if (UserInfo == undefined){
        console.log(regex.email.emailDoesNotExistMsg);
        warningClass(regex.email.emailDoesNotExistMsg)
    }else{
        if(checkUserPasswordInDb(UserInfo)){
            console.log("login Successfully");
            successClass("login Successfully")
            welcomePage(UserInfo.name)
            sessionStorage.setItem('sessionUsername', UserInfo.name)
        }
        else{
            console.log(regex.password.wrongPasswordMsg);
            dangerClass(regex.password.wrongPasswordMsg)
        }
    }
}

function validateUserInput(element){
    if(regex[element.id].test(element.value)==true){
        console.log("match");
        correct = true;
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSiblings.classList.add("d-none")
    }else{
        console.log("not match");
        correct = false;
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSiblings.classList.remove("d-none");
    }
}

function logout() {
    sessionStorage.removeItem('sessionUsername')
}