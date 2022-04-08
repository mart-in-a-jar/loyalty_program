const qrCode = localStorage.getItem("currentQrCode");
let users = JSON.parse(localStorage.getItem("users"));

const cardContainer = document.querySelector(".stampCards");

const userMatch = user => user.guid === qrCode;

const currentUser = users.find(userMatch);
const currentUserIndex = users.findIndex(userMatch);

function getRandomStamp() {
    
}

document.querySelector(".userName").textContent = currentUser.name;

function appendStamp(programId) {
    const programIndex = currentUser.rewardPrograms.findIndex(prog => prog.id === +programId);
    const max = currentUser.rewardPrograms[programIndex].stamps.max;
    let current = currentUser.rewardPrograms[programIndex].stamps.current;
    const stampBoxes = document.querySelectorAll(`.programContainer[data-id="${programId}"] .stampBox`);
    if (currentUser.rewardPrograms[programIndex].type === "open") {
        if ( current >= max) {
        currentUser.rewardPrograms[programIndex].stamps.current = 0;
        stampBoxes.forEach(box => box.textContent = "");
        }
        else {
        currentUser.rewardPrograms[programIndex].stamps.current += 1;
        stampBoxes[current].textContent = "X";
        }
    }
    else if (currentUser.rewardPrograms[programIndex].type === "manual") {
        stampBoxes[current].textContent = "XX"
        stampBoxes[current].classList.add("usedCoupon");
        currentUser.rewardPrograms.splice(programIndex, 1);

    }
    users[currentUserIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
}

function drawStampCard(program) {
    for (let i = 0; i < program.length; i++) {
        if (program[i].status === "inactive") continue;
        let programContainer = document.createElement("div");
        let heading = document.createElement("h2");
        heading.textContent = program[i].name.no;
        programContainer.setAttribute("data-id", program[i].id);
        programContainer.classList.add("programContainer");
        for (let j = 0; j < program[i].stamps.max; j++) {
            let stampBox = document.createElement("div");
            stampBox.classList.add("stampBox");
            if (program[i].stamps.current > j) {
                stampBox.textContent = "X";
            }
            programContainer.appendChild(stampBox);
        }
        cardContainer.appendChild(heading);
        cardContainer.appendChild(programContainer);
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("data-id", program[i].id);
        button.classList.add("addStamp");
        button.textContent = "Registrer kjøp";
        programContainer.appendChild(button);

    }
}


drawStampCard(currentUser.rewardPrograms);
const buttons = document.querySelectorAll(".addStamp");

buttons.forEach(button => {
    button.addEventListener("click", e => {
        const id = e.target.dataset.id;
        appendStamp(id);
    });
});