const colors = ["#660166", "#e6ba1a", "#1080a1", "#00877d", "#e16c1e", "#dd3264"];
const stamps = ["M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"];
const qrCode = localStorage.getItem("currentQrCode");
let users = JSON.parse(localStorage.getItem("users"));
let numberOfBonuses = {};

const cardContainer = document.querySelector(".stampCards");

const userMatch = user => user.guid === qrCode;

const currentUser = users.find(userMatch);
const currentUserIndex = users.findIndex(userMatch);

function random(input1, input2) {
    rand1 = Math.floor(Math.random() * input1.length);
    rand2 = Math.floor(Math.random() * input2.length);
    return [input1[rand1], input2[rand2]];
}

function getRandomStamp() {
    return random(colors, stamps)
}

function writeStamp(element) {
/*     let stampSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    stampSvg.setAttribute("viewBox", "0 0 488 512")
    let stamp = document.createElement("path");
    stamp.setAttribute("d", getRandomStamp()[1]);
    stamp.setAttribute("fill", getRandomStamp()[0]);
    stampSvg.appendChild(stamp);
    element.appendChild(stampSvg); */
    //Fuck it
    element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="${getRandomStamp()[0]}" d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"/></svg><span></span>`
}

document.querySelector(".userName").textContent = currentUser.name;

function appendStamp(programId) {
    const programIndex = currentUser.rewardPrograms.findIndex(prog => prog.id === +programId);
    const max = currentUser.rewardPrograms[programIndex].stamps.max;
    let current = currentUser.rewardPrograms[programIndex].stamps.current;
    const stampBoxes = document.querySelectorAll(`.programContainer[data-id="${programId}"] .stampBox`);
    const bonusCountInfo = document.querySelector(`.programContainerContainer[data-id="${programId}"] .bonusCount`);
    const program = document.querySelector(`.programContainerContainer[data-id="${programId}"]`);
    if (currentUser.rewardPrograms[programIndex].type === "open") {
        if ( current >= max) {
            stampBoxes.forEach(box => box.textContent = "");
            currentUser.rewardPrograms[programIndex].stamps.current = 1;
            writeStamp(stampBoxes[0]);
        }
        else {
            currentUser.rewardPrograms[programIndex].stamps.current += 1;
            writeStamp(stampBoxes[current]);
            if (current === max -1) {
                // Increase by one for each time the stamps reset back to 0
                numberOfBonuses[programId] = numberOfBonuses[programId] ? numberOfBonuses[programId] + 1 : 1;
                bonusCountInfo.textContent = `Antall bonuser for denne handel: \u00a0 ${numberOfBonuses[programId]}`;
                program.classList.add("bonusTriggered");
                startConfetti();
                setTimeout(stopConfetti, 1600);
            }
        }
    }
    else if (currentUser.rewardPrograms[programIndex].type === "manual") {
        stampBoxes[current].classList.add("usedCoupon");
        program.classList.add("bonusTriggered");
        bonusCountInfo.textContent = "Kupong benyttet";
        writeStamp(stampBoxes[0]);
        currentUser.rewardPrograms.splice(programIndex, 1);

    }
    users[currentUserIndex] = currentUser;
    localStorage.setItem("users", JSON.stringify(users));
}

function drawStampCard(program) {
    for (let i = 0; i < program.length; i++) {
        if (program[i].status === "inactive") continue;
        let programContainer = document.createElement("div");
        let programContainerContainer = document.createElement("div");
        let heading = document.createElement("h2");
        let bonusCountInfo = document.createElement("div");
        bonusCountInfo.classList.add("bonusCount");
        heading.textContent = program[i].name.no;
        programContainerContainer.classList.add("programContainerContainer");
        programContainerContainer.setAttribute("data-id", program[i].id);
        programContainer.setAttribute("data-id", program[i].id);
        programContainer.classList.add("programContainer");
        for (let j = 0; j < program[i].stamps.max; j++) {
            if (program[i].stamps.current === program[i].stamps.max && program[i].stamps.max != 1) {
                program[i].stamps.current = 0;
            }
            let stampBox = document.createElement("div");
            stampBox.classList.add("stampBox");
            if (program[i].stamps.current > j) {
                writeStamp(stampBox);
            }
            programContainer.appendChild(stampBox);
        }
        cardContainer.appendChild(programContainerContainer);
        programContainerContainer.appendChild(heading);
        programContainerContainer.appendChild(programContainer);
        programContainerContainer.appendChild(bonusCountInfo);
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