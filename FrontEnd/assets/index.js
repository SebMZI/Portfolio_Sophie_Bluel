const gallery = document.querySelector(".gallery");




const fetchGet = async () => {
  await fetch("http://localhost:5678/api/works").then((res) =>
    res.json().then((data) => (works = data))
  );
  console.log(works[0]);
  works.map((work) => {
    const post = document.createElement("figure");
    post.innerHTML = `
    <img src=${work.imageUrl} alt="image de ${work.title}">
    <h3>${work.title}</h3> 
    `;
    gallery.appendChild(post);
  });
};

fetchGet();
