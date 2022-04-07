// ---------------------------------------------------------- //


// ---------------------------------------------------------- //

let users;
let qrCode;
const input = document.querySelector("#qrCode");
const guidRegex = /[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}/;
const infoBox = document.querySelector(".info");


// Search users
window.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        qrCode = input.value;
        let userExists = users.some(user => user.guid === qrCode);
        if (userExists) {
            localStorage.setItem("currentQrCode", qrCode);
            window.location.href = "stamps.html";
        }
        else if (!guidRegex.test(qrCode)) {
            infoBox.textContent = "Feil format på QR-kode"
        }
    else infoBox.textContent = "";
}
    
});



function importUsers() {
fetch("users.json").then(response => response.json()).then(jsonResponse => users = jsonResponse.users);
setTimeout(() => {
    localStorage.setItem("users", JSON.stringify(users));
}, 100);
}

function importUsersBackup() {
    
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        users = JSON.parse(localStorage.getItem("users"));
    }
    catch(err) {}
    if (!users) {
        importUsers();
    }
});