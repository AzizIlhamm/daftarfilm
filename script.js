const API_URL = "http://localhost:5000/api/films";
const container = document.getElementById("daftar-film");
const loadingText = document.getElementById("loading");
const formFilm = document.getElementById("formFilm");
let semuaFilm = [];

function tampilkanDaftarFilm() {
  loadingText.style.display = 'block';
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      semuaFilm = data;
      container.innerHTML = "";
      data.forEach(film => {
        const filmDiv = document.createElement("div");
        filmDiv.classList.add("film-card");
        filmDiv.innerHTML = `
          <img src="${film.gambar}" alt="${film.judul}">
          <h3>${film.judul}</h3>
          <p>${film.deskripsi}</p>
          <small>Kategori: ${film.kategori}</small>
          <small>Sutradara: ${film.sutradara}</small>
          <small>Rating: ${film.rating}</small>
          <small>Tahun Terbit: ${film.tahun_terbit}</small>
          <br>
          <button onclick="editFilm('${film._id}')">Edit</button>
          <button onclick="hapusFilm('${film._id}')">Hapus</button>
        `;
        container.appendChild(filmDiv);
      });
    })
    .finally(() => loadingText.style.display = 'none');
}

function defaultSubmit(event) {
  event.preventDefault();

  const filmBaru = {
    judul: document.getElementById("judul").value,
    deskripsi: document.getElementById("deskripsi").value,
    kategori: document.getElementById("kategori").value,
    gambar: document.getElementById("gambar").value,
    sutradara: document.getElementById("sutradara").value,
    rating: document.getElementById("rating").value,
    tahun_terbit: document.getElementById("tahun_terbit").value
  };

  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filmBaru)
  })
    .then(res => res.json())
    .then(() => {
      tampilkanDaftarFilm();
      formFilm.reset();
    });
}

function hapusFilm(id) {
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(() => {
      tampilkanDaftarFilm();
    });
}

function editFilm(id) {
  const film = semuaFilm.find(f => f._id.toString() === id);
  if (!film) return alert("Film tidak ditemukan!");

  document.getElementById("judul").value = film.judul;
  document.getElementById("deskripsi").value = film.deskripsi;
  document.getElementById("kategori").value = film.kategori;
  document.getElementById("gambar").value = film.gambar;
  document.getElementById("sutradara").value = film.sutradara;
  document.getElementById("rating").value = film.rating;
  document.getElementById("tahun_terbit").value = film.tahun_terbit;

  formFilm.onsubmit = function (event) {
    event.preventDefault();

    const filmUpdate = {
      judul: document.getElementById("judul").value,
      deskripsi: document.getElementById("deskripsi").value,
      kategori: document.getElementById("kategori").value,
      gambar: document.getElementById("gambar").value,
      sutradara: document.getElementById("sutradara").value,
      rating: document.getElementById("rating").value,
      tahun_terbit: document.getElementById("tahun_terbit").value
    };

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filmUpdate)
    })
      .then(res => res.json())
      .then(() => {
        tampilkanDaftarFilm();
        formFilm.reset();
        formFilm.onsubmit = defaultSubmit;
      });
  };
}

formFilm.onsubmit = defaultSubmit;
tampilkanDaftarFilm();