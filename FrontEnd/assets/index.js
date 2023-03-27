const gallery = document.querySelector(".gallery");
const filtersContainer = document.querySelector(".filters-container");
const editBanner = document.querySelector(".modify-banner");
const editBtn = document.querySelectorAll(".edit-btn");
const log = document.querySelector(".log-link-title");
const filters = new Set();

console.log(log);
// Fetch Works
const fetchGet = async () => {
  // lien avec l'API
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json().then((data) => (works = data)))
    .catch((err) => {
      console.log(`Erreur : ${err}`);
    });
  console.log(works[2]);

  // Ajout des travaux
  galleryWork(works);
};

// Fetch Catégories
const fetchCategory = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((res) => res.json().then((cat) => (categories = cat)))
    .catch((err) => {
      console.log(`Erreur : ${err}`);
    });

  //Ajout des filtres
  filtres(categories);
};

// Implémente les Images dans la gallery
function galleryWork(works) {
  works.map((work) => {
    const post = document.createElement("figure");
    post.innerHTML = `
    <img src=${work.imageUrl} alt="image de ${work.title}">
    <h3>${work.title}</h3> 
    `;
    gallery.appendChild(post);
  });
}

// Créer les filtres
function filtres(categories) {
  categories.map((filter) => {
    filters.add(filter.name);
  });

  // Tranforme l'objet set en array
  const filtersArray = Array.from(filters);
  //Créer les éléments buttons
  for (let i = 0; i < filtersArray.length; i++) {
    const filtre = document.createElement("button");
    filtre.classList.add(
      "filter-btn",
      `${filtersArray[i].split(" ").join("")}`
    );
    filtre.innerText = filtersArray[i];
    filtersContainer.appendChild(filtre);
  }

  //Filtre au clic
  const btnTous = document.getElementById("tous");
  btnTous.addEventListener("click", () => {
    gallery.innerHTML = "";
    fetchGet();
  });

  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((button) => button.classList.remove("active"));
      gallery.innerHTML = "";
      const workFiltered = works.filter((work) => {
        return work.category.name === e.target.innerText;
      });
      button.classList.add("active");
      galleryWork(workFiltered);
    });
  });
}

console.log(typeof sessionStorage.login);

//Affiche le mode edition si connecté
function editMode() {
  if (localStorage.login === "true") {
    console.log("Vous êtes connecté !");
    console.log(sessionStorage.token);
    editBanner.style.setProperty("display", "flex");
    log.innerText = "logout";
    editBtn.forEach((btn) => {
      btn.style.setProperty("display", "flex");
    });
  } else {
    console.log("Vous n'êtes pas connecté ! Identifiez-vous !");
  }
}

log.addEventListener("click", () => {
  localStorage.removeItem("login");
  localStorage.removeItem("token");
  log.innerText = "login";
});

fetchGet();
fetchCategory();
editMode();
