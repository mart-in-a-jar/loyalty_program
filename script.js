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
        input.value = "";
        let userExists = users.some(user => user.guid === qrCode);
        if (userExists) {
            localStorage.setItem("currentQrCode", qrCode);
            window.location.href = "stamps.html";
        }
        else if (!guidRegex.test(qrCode)) {
            infoBox.textContent = "Feil format på QR-kode"
        }
    else infoBox.textContent = "Bruker ikke funnet";
}
    
});



function importUsers() {
    fetch("users/users.json").then(response => response.json()).then(jsonResponse => users = jsonResponse.users);
    setTimeout(() => {
    if (!users) {
        users = usersManual;
        console.log("Users added 'manually'");
    }
    }, 100);
    setTimeout(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, 100);
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

input.addEventListener("blur", () => {
    setTimeout(() => {
        input.focus(); 
    }, 20);
});

const usersManual = [
    {
        "guid": "40f94485-bf31-401f-b10b-a06554cfdaba",
        "name": "User 1",
        "rewardPrograms":
        [
            {
                "id": 3,
                "department": "bookstore",
                "name": 
                {
                    "no": "Halv pris på hver 5. bok",
                    "en": "Half price on every 5th. book"
                },
                "type": "open",
                "status": "active",
                "description":
                    {
                     "public": 
                     {
                         "no": "Norsk beskrivelse til appen, klippekort",
                         "en": "English description for the app, stamp card"
                     },
                     "internal": "Beskrivelse til ansatte, klippekort"
                  },
                  "stamps":
                  {
                      "current": 0,
                      "max": 5
                  }
              },
              {
                  "id": 2,
                  "department": "bookstore",
                  "name": 
                  {
                      "no": "Kupong på gratis penn",
                      "en": "Coupon: free pen"
                  },
                  "type": "manual",
                  "status": "active",
                  "description":
                      {
                       "public": 
                       {
                           "no": "Norsk beskrivelse til appen, kupong",
                           "en": "English description for the app, coupon"
                       },
                       "internal": "Beskrivelse til ansatte, kupong"
                    },
                    "stamps":
                    {
                        "current": 0,
                        "max": 1
                    }
                }
        ]
    },
    {
      "guid": "254b803b-add9-436a-afcb-993e9c23ccef",
      "name": "User 2",
      "rewardPrograms":
      [
          {
              "id": 3,
              "department": "bookstore",
              "name": 
              {
                  "no": "Halv pris på hver 5. bok",
                  "en": "Half price on every 5th. book"
              },
              "type": "open",
              "status": "active",
              "description":
                  {
                   "public": 
                   {
                       "no": "Norsk beskrivelse til appen, klippekort",
                       "en": "English description for the app, stamp card"
                   },
                   "internal": "Beskrivelse til ansatte, klippekort"
                },
                "stamps":
                {
                    "current": 2,
                    "max": 5
                }
            },
            {
                "id": 2,
                "department": "bookstore",
                "name": 
                {
                    "no": "Kupong på gratis penn",
                    "en": "Coupon: free pen"
                },
                "type": "manual",
                "status": "active",
                "description":
                    {
                     "public": 
                     {
                         "no": "Norsk beskrivelse til appen, kupong",
                         "en": "English description for the app, coupon"
                     },
                     "internal": "Beskrivelse til ansatte, kupong"
                  },
                  "stamps":
                  {
                      "current": 0,
                      "max": 1
                  }
              }
      ]
  },
  {
      "guid": "391d1065-7659-4143-8939-baaee39cc4a5",
      "name": "User 3",
      "rewardPrograms":
      [
          {
              "id": 3,
              "department": "bookstore",
              "name": 
              {
                  "no": "Halv pris på hver 5. bok",
                  "en": "Half price on every 5th. book"
              },
              "type": "open",
              "status": "active",
              "description":
                  {
                   "public": 
                   {
                       "no": "Norsk beskrivelse til appen, klippekort",
                       "en": "English description for the app, stamp card"
                   },
                   "internal": "Beskrivelse til ansatte, klippekort"
                },
                "stamps":
                {
                    "current": 1,
                    "max": 5
                }
            },
            {
                "id": 2,
                "department": "bookstore",
                "name": 
                {
                    "no": "Kupong på gratis penn",
                    "en": "Coupon: free pen"
                },
                "type": "manual",
                "status": "active",
                "description":
                    {
                     "public": 
                     {
                         "no": "Norsk beskrivelse til appen, kupong",
                         "en": "English description for the app, coupon"
                     },
                     "internal": "Beskrivelse til ansatte, kupong"
                  },
                  "stamps":
                  {
                      "current": 0,
                      "max": 1
                  }
              }
      ]
  },
  {
      "guid": "235819d8-1c86-46f0-a2fa-bfa3e5d22dc0",
      "name": "User 4",
      "rewardPrograms":
      [
          {
              "id": 3,
              "department": "bookstore",
              "name": 
              {
                  "no": "Halv pris på hver 5. bok",
                  "en": "Half price on every 5th. book"
              },
              "type": "open",
              "status": "active",
              "description":
                  {
                   "public": 
                   {
                       "no": "Norsk beskrivelse til appen, klippekort",
                       "en": "English description for the app, stamp card"
                   },
                   "internal": "Beskrivelse til ansatte, klippekort"
                },
                "stamps":
                {
                    "current": 0,
                    "max": 5
                }
            },
            {
                "id": 2,
                "department": "bookstore",
                "name": 
                {
                    "no": "Kupong på gratis penn",
                    "en": "Coupon: free pen"
                },
                "type": "manual",
                "status": "active",
                "description":
                    {
                     "public": 
                     {
                         "no": "Norsk beskrivelse til appen, kupong",
                         "en": "English description for the app, coupon"
                     },
                     "internal": "Beskrivelse til ansatte, kupong"
                  },
                  "stamps":
                  {
                      "current": 0,
                      "max": 1
                  }
              }
      ]
  },
  {
      "guid": "46ee279e-60bd-4875-9caa-5a033b028e60",
      "name": "User 5",
      "rewardPrograms":
      [
          {
              "id": 3,
              "department": "bookstore",
              "name": 
              {
                  "no": "Halv pris på hver 5. bok",
                  "en": "Half price on every 5th. book"
              },
              "type": "open",
              "status": "active",
              "description":
                  {
                   "public": 
                   {
                       "no": "Norsk beskrivelse til appen, klippekort",
                       "en": "English description for the app, stamp card"
                   },
                   "internal": "Beskrivelse til ansatte, klippekort"
                },
                "stamps":
                {
                    "current": 0,
                    "max": 5
                }
            },
            {
                "id": 2,
                "department": "bookstore",
                "name": 
                {
                    "no": "Kupong på gratis penn",
                    "en": "Coupon: free pen"
                },
                "type": "manual",
                "status": "inactive",
                "description":
                    {
                     "public": 
                     {
                         "no": "Norsk beskrivelse til appen, kupong",
                         "en": "English description for the app, coupon"
                     },
                     "internal": "Beskrivelse til ansatte, kupong"
                  },
                  "stamps":
                  {
                      "current": 0,
                      "max": 1
                  }
              }
      ]
  }
  ];