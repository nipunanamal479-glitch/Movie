<script src="Data.js"></script>

<script src="search.js"></script>

<script>
    const list = document.getElementById('movie-list');
    
    function renderMovies(arr) {
        list.innerHTML = "";
        arr.forEach(m => {
            list.innerHTML += `
                <div class="card" onclick="openMovie(${m.id})">
                    <img src="${m.image}" alt="">
                    <h3>${m.title}</h3>
                </div>`;
        });
    }

    function toggleSearch() { document.getElementById('search').classList.toggle('active'); }
    function openMovie(id) { /* ... කලින් තිබ්බ කෝඩ් එකම ... */ }
    function closeModal() { document.getElementById("myModal").classList.remove("active"); }

    renderMovies(movies); // මේක අනිවාර්යයෙන්ම අන්තිමටම තියන්න
</script>

