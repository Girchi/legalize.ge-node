const users = [
    {
        "id_number": null,
        "name": "კუკური",
        "surname": "ნებაძე",
        "img": "assets/img/users/კუკურინებაძე.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "გიგა",
        "surname": "გოგაშვილი",
        "img": "assets/img/users/გიგაგოგაშვილი.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "გიორგი",
        "surname": "არაბული",
        "img": "assets/img/users/გიორგიარაბული.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "ირაკლი",
        "surname": "ბურღაშვილი",
        "img": "assets/img/users/ირაკლიბურღაშვილი.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "ლევანი",
        "surname": "ჩოთალიშვილი",
        "img": "assets/img/users/ლევანიჩოთალიშვილი.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "მერი",
        "surname": "ნაცარაშვილი",
        "img": "assets/img/users/მერინაცარაშვილი.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "ნუგო",
        "surname": "ბიბილაშვილი",
        "img": "assets/img/users/ნუგობიბილაშვილი.jpg",
        "status": "მწეველი",
        "path": ""
    },

    {
        "id_number": null,
        "name": "რეზო",
        "surname": "ტეტუნაშვილი",
        "img": "assets/img/users/რეზოტეტუნაშვილი.jpg",
        "status": "მწეველი",
        "path": ""
    }
];

let data = '';
const container = document.getElementById('myUL');
let userCount = 0;

for(let i in users) {
    // Adding path key to the object
    users[i].path = `${users[i].name}_${users[i].surname}` 
    data += `<li class='li-element' value=${users[i].path}>
    <a href="../user-profile.html" id="user_in_list" class="user--li" value=${users[i].name}${users[i].surname}>
    <img id='user-pic' src='${users[i].img}'>
    <span class="user--name">${users[i].name} ${users[i].surname}</span>
    </a></li> `
    container.innerHTML = data;

    userCount++;
}


let arr = document.querySelectorAll('.li-element');
arr.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(e.target.attributes.value.nodeValue);
    });
});



document.getElementById('underUl').innerHTML = `მომხმარებელთა რაოდენობა - ${userCount}`

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

const user_in_list = document.getElementById('user_in_list');


// window.location.assign('./asd');

module.exports = users
