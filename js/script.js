var bookmarkName = document.getElementById("bookmarkName");
var bookmarkUrl = document.getElementById("bookmarkUrl");
var tableContent = document.getElementById("tableContent");
var UpdateBtn = document.getElementById("updateBtn");
var AddBtn = document.getElementById("addBtn");
var searchInput = document.getElementById("searchInput");

var bookmarks = [];
var bookmarkIndex;


if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
}

displayBookmark()
function updateLocalStorage(){
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function clearForm(){
    bookmarkName.value = null;
    bookmarkUrl.value = null;
}

function displayBookmark() {
    var newBookmark = [];
    for (var index = 0; index < bookmarks.length; index++) {
        newBookmark += `
        <tr>
            <th scope="row">${index + 1}</th>
            <th scope="row">${bookmarks[index].name}</th>
            <th scope="row">
                <button class="btn btn-success"
                    onclick="visitWebsite(${index})"
                    data-index="${index}">
                    <i class="fa-solid fa-eye"></i>Visit
                </button>
            </th>
            <td> <button class="btn btn-warning"
                    onclick="getBookmarkToUpdate(${index})"
                    data-index="${index}">
                    <i class="fa-solid fa-pen"></i>Edit
                </button>
            </td>
            <td> 
                <button class="btn btn-danger"
                    onclick="deleteBookmark(${index})"
                    data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>Delete
                </button></td>
        </tr>
        `  
    }
    tableContent.innerHTML = newBookmark; 
}

function addWebsite(){
    var site = {
        name: bookmarkName.value,
        url: bookmarkUrl.value
    }
    bookmarks.push(site);
    displayBookmark();
    updateLocalStorage();
    clearForm();
}

function visitWebsite(index){
    open(`https://${bookmarks[index].url}`);
}

function deleteBookmark(index){
    bookmarks.splice(index, 1);
    displayBookmark();
    updateLocalStorage();
}

function getBookmarkToUpdate(index){
    bookmarkIndex= index;
    var item = bookmarks[bookmarkIndex]
    bookmarkName.value = item.name;
    bookmarkUrl.value = item.url;
    UpdateBtn.classList.remove("d-none");
    UpdateBtn.classList.add("d-block");
    AddBtn.classList.remove("d-block");
    AddBtn.classList.add("d-none");
}

function UpdateWebsite(){

    bookmarks[bookmarkIndex].name = bookmarkName.value;
    bookmarks[bookmarkIndex].url = bookmarkUrl.value;
    clearForm();
    displayBookmark();
    updateLocalStorage();
    UpdateBtn.classList.add("d-none");
    UpdateBtn.classList.remove("d-block");
    AddBtn.classList.add("d-block");
    AddBtn.classList.remove("d-none");
}


function search(){
    var searchTerm = searchInput.value;
    searchItems =[];
    var item;
    for (var index = 0; index < bookmarks.length; index++) {
        item = bookmarks[index].name;
        if (item.toLowerCase().includes(searchTerm.toLowerCase())) {
            searchItems += `
            <tr>
                <th scope="row">${index + 1}</th>
                <th scope="row">${bookmarks[index].name}</th>
                <th scope="row">
                    <button class="btn btn-success"
                        onclick="visitWebsite(${index})"
                        data-index="${index}">
                        <i class="fa-solid fa-eye"></i>Visit
                    </button>
                </th>
                <td> <button class="btn btn-warning"
                        onclick="getBookmarkToUpdate(${index})"
                        data-index="${index}">
                        <i class="fa-solid fa-pen"></i>Edit
                    </button>
                </td>
                <td> 
                    <button class="btn btn-danger"
                        onclick="deleteBookmark(${index})"
                        data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>Delete
                    </button></td>
            </tr>
            `  
        };
        tableContent.innerHTML = searchItems; 
    }
};
