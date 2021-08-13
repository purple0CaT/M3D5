window.onload = () => {
    fetchArtists()
}

const fetchArtists = () => {
    fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/')
    .then(response = response.json())
    .then(artists => {
        console.log(artists)
        loadArtists(artists)
    }) 
}

const loadArtists= (artists) => {
    let table =  document.getElementById('dynamicArtistTracks')
    table.innerHTML = ''
    artists.forEach(ele => {
        let table =  document.getElementById('dynamicArtistTracks')
        table += `<tr>
        <th scope="row">1</th>
        <td class="ml-2"><img src="./Images/image-song.jpg" alt="sample-image">&nbsp;&nbsp; Keep Yourself
          Alive
        </td>
        <td>1,23,080,00</td>
        <td>2:59</td>
      </tr>`
    });
}

