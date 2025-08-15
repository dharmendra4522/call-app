//new cards create karne hai, data local storage mein save karna hai
// localstorage se hi cards ko show karna hai
// buttons ko handle karna hai
//filter ko handle karna hai

//ALL VALRIABLES AND DOC SELECTIONS


let addNote = document.querySelector("#add-note");
let formContainer = document.querySelector(".form-container");
let closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

const imageUrlInput = form.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const fullNameInput = form.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = form.querySelector('input[placeholder="Enter home town"]');
const purposeInput = form.querySelector('input[placeholder="e.g., Quick appointment note"]');

const categoryRadios = form.querySelectorAll('input[name="category"]');
const submitBtn = form.querySelector(".submit-btn");


// CODE STARTS HERE

function saveToLocalStorage(obj) {
    //purane local storage se data nikalo
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        JSON.stringify(oldTasks);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    } else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}


addNote.addEventListener("click", function () {
    formContainer.style.display = "initial";
});

closeForm.addEventListener("click", function () {
    formContainer.style.display = "none";
});


form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    //trimmed values
    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();

    let selected = false;
    categoryRadios.forEach(function (cat) {
        if (cat.checked) {
            selected = cat.value;
        }

    })

    //validations logic
    if (imageUrl === "") {
        alert("Please enter an Image URL.");
        return;
    }
    if (fullName === "") {
        alert("Please enter your Full Name.");
        return;
    }
    if (homeTown === "") {
        alert("Please enter your Home Town.");
        return;
    }
    if (purpose === "") {
        alert("Please enter the Purpose.");
        return;
    }

    if (!selected) {
        alert("Please select a category");
        return;
    }

    //save to local storage
    saveToLocalStorage({
        imageUrl,
        fullName,
        purpose,
        homeTown,
        selected,
    });

    //reset form
    form.reset();
    formContainer.style.display = "none";
    showCards();
});


function showCards() {
    stack.innerHTML = ""; // Purane cards hata do

    let allTasks = JSON.parse(localStorage.getItem("tasks")) || []; // null ki jagah []

    stack.innerHTML = ""; // Purane cards hata do

    allTasks.forEach(function (task) {
        //create card container
        const card = document.createElement("div");
        card.classList.add("card");

        //avatar image
        const avatar = document.createElement("img");
        avatar.src = task.imageUrl;
        avatar.alt = "profile";
        avatar.classList.add("avatar");
        card.appendChild(avatar);

        //name
        const name = document.createElement("h2");
        name.textContent = task.fullName;
        card.appendChild(name);


        //info: home town
        const hometownInfo = document.createElement("div");
        hometownInfo.classList.add("info");
        const hometownLabel = document.createElement("span");
        hometownLabel.textContent = "Home town";
        const hometownValue = document.createElement("span");
        hometownValue.textContent = task.homeTown;
        hometownInfo.appendChild(hometownLabel);
        hometownInfo.appendChild(hometownValue);
        card.appendChild(hometownInfo);

        //info: bookings
        const bookingsInfo = document.createElement("div");
        bookingsInfo.classList.add("info");
        const bookingsLabel = document.createElement("span");
        bookingsLabel.textContent = "Purpose";
        const bookingsValue = document.createElement("span");
        bookingsValue.textContent = task.purpose;
        bookingsInfo.appendChild(bookingsLabel);
        bookingsInfo.appendChild(bookingsValue);
        card.appendChild(bookingsInfo);

        //buttons container
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("buttons");
        //call button
        const callBtn = document.createElement("button");
        callBtn.classList.add("call");
        callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';
        //message button
        const msgBtn = document.createElement("button");
        msgBtn.classList.add("msg");
        msgBtn.textContent = "Message";
        //append buttons
        buttonsDiv.appendChild(callBtn);
        buttonsDiv.appendChild(msgBtn);
        //append buttonsDiv to card
        card.appendChild(buttonsDiv);

        //finally, add the card to the DOM
        stack.appendChild(card);
    });
}

showCards();


upBtn.addEventListener("click", function () {
    let lastChild = stack.lastElementChild;
    if (lastChild) {
        stack.insertBefore(lastChild, stack.firstElementChild);
        //update
        updateStack();
    }

})

// Function to update the stack of cards
function updateStack() {
    const cards = document.querySelectorAll(".stack .card");
    for (let i = 0; i < 3; i++) {
        cards[i].style.zIndex = 3 - i;
        cards[i].style.transform = `translateY(${i * 10}px) scale(${1 - i * 0.02})`;
        cards[i].style.opacity = `${1 - i * 0.02}`;
    }
    
}

downBtn.addEventListener("click", function () {
    const firstChild = stack.firstElementChild;
    if (firstChild) {
        stack.appendChild(firstChild);  
        //update
        updateStack();
    }
})



