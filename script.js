// ---------------------------------------------------------- //


// ---------------------------------------------------------- //

let users;
let qrCode;
const input = document.querySelector("#qrCode");
const guidRegex = /[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}/;
const infoBox = document.querySelector(".info");

try {
    users = JSON.parse(localStorage.getItem("users"));
}
catch(err) {}

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
fetch("users.json").then(response => response.json()).then(jsonResponse => localStorage.setItem("users", JSON.stringify(jsonResponse.users)));
users = JSON.parse(localStorage.getItem("users"));
console.log("Ok");
}

document.addEventListener("DOMContentLoaded", () => {
    if (!users) {
        importUsers();
    }
});