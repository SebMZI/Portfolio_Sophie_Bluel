const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const mdpInput = document.getElementById("mdp");
const errorMsg = document.querySelector(".erreur-msg");

let mail = "";
let mdp = "";

function fetchPost(userLogins) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(userLogins),
    mode: "cors",
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.message === "user not found") {
        errorMsg.innerText = "Erreur dans l’identifiant ou le mot de passe";
      } else {
        sessionStorage.token = res.token;
        window.location.href = "index.html";
        console.log("Connexion réussie");
      }
    })
    .catch((err) => console.log("Il y a eu une erreur sur le Fetch: " + err));
}

emailInput.addEventListener("input", (e) => {
  userLogins.email = e.target.value;
  console.log(e.target.value);
});

mdpInput.addEventListener("input", (e) => {
  userLogins.password = e.target.value;
  console.log(e.target.value);
});

let userLogins = {
  //   email: mail,
  //   password: mdp,
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(userLogins);
  fetchPost(userLogins);
});
