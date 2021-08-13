   let albums = []
   console.log(albums)
        window.onload = () => {
            fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen")
                .then(response => response.json())
                .then(receivedAlbums => {
                  console.log(receivedAlbums)
                  albums.push(receivedAlbums)
                  console.log(albums)
                  displayAlbums(receivedAlbums)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        function filterAlbums(query) {

            const filteredAlbums = albums.filter((album) =>
                album.title.toLowerCase().includes(query.toLowerCase())
            )
            console.log(filteredAlbums)

            displayAlbums(filteredAlbums)
        }

      function displayAlbums(albums) {
            const row = document.getElementById("appendAlbum")
            for (let album of albums.data) {
                row.innerHTML += `
               <a
              href="album.html"
              class="tab d-flex align-items-center align-middle">
              <div class="mr-3 liked-tab">
                <img src="${album.artist.picture}"/>
              </div>
              <p class="inline-block">${album.title}</p>
              </a>
                `
            }

        }

     