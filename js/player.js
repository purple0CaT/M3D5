
let rawData
// ALBUM VALUE FOR SEARCH
let albID = new URLSearchParams(window.location.search).get('id')
download()

// const
let thisTrack
let thisOneT
const albumCover = document.getElementById('albumInfo')



// ======================    M3D5

// FetCHING
function download(){
    fetch("https://striveschool-api.herokuapp.com/api/deezer/album/"+albID)
    .then( response => response.json())
    .then(data => rawData = data)
    .catch(err => alert(err))
}



let All_song =[]



// uploading data to library
function uploadLibr(){
    let hr = Math.floor((rawData.duration/60)/60)
    let min = Math.floor((rawData.duration / 60))
    if (min >60){
        min = min-60
    }
    albumCover.innerHTML = `
    <div class="albm-img mr-3">
        <img src="${rawData.cover_big}" alt="12">
    </div>
    <div class="albm-title d-flex flex-column justify-content-end">
    <h6>Album</h6>
    <h1>${rawData.title}</h1>
    <div class="albm-details">
    <img src= ${rawData.artist.picture} alt="">
    <a href="artist-1.html?aid=${rawData.artist.id}" onclick="artClick(this)" value=${rawData.artist.id}><span>${rawData.artist.name}</span></a>
            <div class="albm-info">
                <small> &bull; 2018 </small>
                <small> &bull; ${rawData.nb_tracks} songs, </small>
                <small> &bull; ${hr}hr ${min}min </small>
            </div>
    </div>
</div>
    `

    rawData.tracks.data.forEach(elem => {
        let dataObj = {
        name: elem.title,
        path: elem.preview,
        img: 'https://fresh-song.ru/uploads/posts/2018-10/1540027773_cover.jpg',
        singer: elem.artist.name,
        tDur: elem.duration
        }
        All_song.push(dataObj)
    });

for (j=1; 0 <= All_song.length; j++){
    createList(j)
}
}


// PLAYER FUNCTIONALITY
function onload(){
    setTimeout(uploadLibr(),1000)
// player staff
    activeTr()
    thisTrack[indx].classList.add('active-track')
    for(let trcks of thisTrack){

        trcks.addEventListener('click', function(){
            if(playingSong == false){
                playingSong = true
            for(let delA of thisTrack){
                delA.classList.remove('active-track')
            }
            load_track(trcks.getAttribute('value'))
            playSong()
            trcks.classList.add('active-track')
        } else {
            playingSong = false
            pauseSong()
        }
        })
    }
    load_track(0)
    timeChng()

    // tracktime
function timeChng(){
    let inf = document.createElement('audio')
    for (r=0; r < All_song.length; r++){
        inf.src = All_song[r].path
        inf.load()
        document.querySelectorAll('.time small')[r].innerText = `${inf.duration}`
    }
}
}

setTimeout(onload,2000)

// inputs
const durat= document.getElementById('durationM')
const volume = document.getElementById('volumeM')
const image = document.getElementById('titleImg')


// Player button
const shufle = document.getElementById('randomBtn')
const prew = document.getElementById('prewBtn')
const play = document.getElementById('playBtn')
const playA = document.getElementById('playA')
const next = document.getElementById('nextBtn')
const repeat = document.getElementById('repeatBtn')
const mute = document.getElementById('muteM')
const title = document.getElementById('titleM')
const author = document.getElementById('authorM')
// list


// const
let timer
let indx = 0
let autoplay = 0
let playingSong = false
let muteSong = 0


// music libr
let track = document.createElement('audio')



// event listener 
play.addEventListener('click', justPlay)
playA.addEventListener('click', justPlay)
next.addEventListener('click', nextSong)
prew.addEventListener('click', prewSong)
durat.addEventListener('change', durChange)
durat.addEventListener('click', durChange)
volume.addEventListener('change', volChange)
volume.addEventListener('click', volChange)
repeat.addEventListener('click', repeatSong)
mute.addEventListener('click', muteM)


// Functions creating list of music
function createList(j){
    lists.innerHTML+=
    `<a class="play-list-body d-flex align-items-center" value=${j-1}>
    <div class="d-flex list-title">
        <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
            <span>${j}</span>
            </div>
        </div>
        <div class="d-flex flex-column align-items-start">
            <p>${All_song[j].name}</p>
            <small>${All_song[j].singer}</small>
        </div>
    </div>
        <div class="time">
            <small>${Math.floor((All_song[j].tDur/60))}:${Math.floor((All_song[j].tDur % 60))}</small>
        </div>
    </a>`
    // bug fix>??????
}


// -------------LOAD MUSICCCCC
function load_track(indx){
    clearInterval(timer)
    resetSlider()
    track.src = All_song[indx].path
    image.src = All_song[indx].img
    author.innerText = All_song[indx].singer
    title.innerText = All_song[indx].name
    track.load()
    
    for (let trcks of thisTrack){
        trcks.classList.remove('active-track')
    }
    thisTrack[indx].classList.add('active-track')
    timer = setInterval(rangeSl, 500)
    timer = setInterval(barProg, 500)
    timer = setInterval(timerRenew, 500)
}

// timer renewer
function timerRenew () {
    let curTimeH = document.getElementById('timeStartH')
    let curTimeM = document.getElementById('timeStartM')
    curTimeH.innerText = Math.floor(track.currentTime/60) + ':'
    curTimeM.innerText = Math.floor(track.currentTime%60)

    let timeFinishH = document.getElementById('timeFinishH')
    let timeFinishM = document.getElementById('timeFinishM')
    timeFinishH.innerText = Math.floor(track.duration/60) + ':'
    timeFinishM.innerText = Math.floor(track.duration%60)

}

// play check
function justPlay(){
    if (playingSong == false){
        playSong()
    } else {
        pauseSong()
    }
}
// play
function playSong(){
    track.play()
    playingSong = true
    play.classList.remove('fa-play-circle')
    play.classList.add('fa-pause')
    playA.classList.remove('fa-play-circle')
    playA.classList.add('fa-pause')


}
// pause
function pauseSong(){
    track.pause()
    playingSong = false
    play.classList.remove('fa-pause')
    play.classList.add('fa-play-circle')
    playA.classList.remove('fa-pause')
    playA.classList.add('fa-play-circle')

}

// next song
function nextSong (){
    if (indx < All_song.length-1){
        if (shufleM == 1){
            shufleMus()
            load_track(indx)
            playSong()    
        } else {
            indx += 1
            load_track(indx)
            playSong()    
        }
    } else {
        if (shufleM == 1){
            shufleMus()
            load_track(indx)
            playSong()    
        } else {
            indx = 0
            load_track(indx)
            playSong()
        }
    }
}
// prew song
function prewSong (){
    if (indx > 0){
        if (shufleM == 1){
            shufleMusB()
            load_track(indx)
            playSong()
        } else {
            
            indx -= 1
            load_track(indx)
            playSong()
        }
    } else {
        if (shufleM == 1){
            shufleMusB()
            load_track(indx)
            playSong()
        } else {      
            indx = All_song.length
            load_track(indx)
            playSong()
        }
    }

}

// -------SHUFLE LISTENER
shufle.addEventListener('click', shufleIt)
let shufleM = 0
let randM = 0
let sLibr = []
let bLibr = []
let xIndx = -1
let yIndx = -1

function shufleIt(){
    if(shufleM == 0){
        shufle.style.color = '#1DB954'
        shufleM = 1
        for (j=0; j < All_song.length; j++){
            randomM()
            while (sLibr.includes(randM) == true){
                randomM()
            }
            sLibr.push(randM)
            bLibr.unshift(randM)
        }
    } else {
        sLibr = []
        shufleM = 0
        shufle.style.color = '#b3b3b3'
    }
    console.log(sLibr)
    shufleMus()
    console.log(bLibr)
}
// shufle netx
function shufleMus(){
    xIndx = xIndx + 1
    console.log(xIndx)
    indx = sLibr[xIndx]
}
// shufle previous
function shufleMusB(){
    yIndx = yIndx + 1
    console.log(yIndx)
    indx = bLibr[yIndx]
}

function randomM(){
    randM = Math.floor(Math.random()*(All_song.length-0)+0)
}


// Duration change
function barProg() {
    let percent
    percent = Math.round(track.currentTime / (track.duration / 100))
    durat.style.background = `linear-gradient(to right, white, ${percent}%, #b3b3b3 0%)`
    volume.style.background = `linear-gradient(to right, white, ${volume.value}%, #b3b3b3 0%)`
}
function durChange(){
    let slider = track.duration * (durat.value / 100)
    track.currentTime = slider
    durat.style.background = `linear-gradient(to right, white, ${durat.value}%, #b3b3b3 0%)`
}

// slider range
function rangeSl(){
    let position = 0
        // update slider position
        if (!isNaN(track.duration)){
            position = track.currentTime * (100 / track.duration )
            durat.value = position
        }
        if (track.ended){
            play.classList.remove('fa-pause')
            play.classList.add('fa-play-circle')
            if (autoplay==1){
                if (shufleM == 1){
                    shufleMus()
                    load_track(indx)
                    playSong()
                } else {
                    indx +=1
                    load_track(indx)
                    playSong()
                }
            }
        }
}


// MUTE
let trackVol = 0
function muteM (){
    if (muteSong == 0 ){
        muteSong = 1
        track.volume = 0
        volume.value = 0    
    } else {
        muteSong = 0
        track.volume = trackVol / 100
        volume.value = trackVol
    }

    switch (muteSong){
        case 0:     
        mute.classList.add("fa-volume-up")
        mute.classList.remove("fa-volume-mute")
        mute.style.color = "#b3b3b3"
        break;
        case 1:     
        mute.classList.remove("fa-volume-up")
        mute.classList.add("fa-volume-mute")
        mute.style.color = "#1DB352"
        break;
    }
}
// Vol Change
function volChange(){
    track.volume = volume.value / 100
    trackVol = volume.value
    volume.style.background = `linear-gradient(to right, white, ${volume.value}%, #b3b3b3 0%)`
}

// repeat
function repeatSong(){
    if (autoplay==1){
        autoplay = 0 
        repeat.style.color = "#b3b3b3"
    } else {
        autoplay=1
        repeat.style.color = "#1DB352"
    }
}
// reseting slider
function resetSlider (){
    durat.value = 0
}


// creating music librbry
const lists = document.querySelector('.play-list')
for (j=0; 0 < All_song.length; j++){
    createList(j)
}

// active track
// listener


function activeTr (indx){
    thisTrack = document.querySelectorAll('.play-list-body')
}


// // clicking album
function artClick(par){
    localStorage.setItem('artistVal', par)
    window.location.href="artist.html" 
}