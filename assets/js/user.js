async function fetchUsers() {
    const response = await fetch('./assets/js/users.json');
    const users = await response.json()
    return users.data
  }

async function setUsers(){
    let users = await fetchUsers();
    let userslist = '';
    const container = document.getElementById('myUL');
    
    let userCount = 0;
    let usersID = 0;
    
    for(let i in users) {
        users[i].id = usersID;
        usersID++;
        userslist += `<li>
        <a href="user/${users[i].id}" class="user--li">
        <img class='user-pic' src='${users[i].img}'>
        <span class="user--name">${users[i].name} ${users[i].surname}</span>
        </a></li>`
        container.innerHTML = userslist;
        userCount++;
    }
    document.getElementById('underUl').innerHTML = `სულ მომხმარებელთა რაოდენობა - ${userCount}`
}
document.addEventListener("DOMContentLoaded", setUsers)


function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
