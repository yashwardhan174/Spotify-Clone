console.log("Welcome To Spotify");

//Initialize the Variables

let songIndex = 0;
let audioElement = new Audio('audio/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    // {songName: "Raat Ki Raani", filePath: "audio/1.mp3", coverPath: "covers/cover1.jpeg"},
    {songName: "Caramel Tax", filePath: "audio/2.mp3", coverPath: "covers/cover2.jpeg"},
    {songName: "Ishaaro Ki Zubaan", filePath: "audio/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Raashah", filePath: "audio/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Akatsuki", filePath: "audio/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Not Available", filePath: "audio/2.mp3", coverPath: "covers/cover2.jpeg"},
    {songName: "Not Available", filePath: "audio/2.mp3", coverPath: "covers/cover2.jpeg"},
    {songName: "Not Available", filePath: "audio/2.mp3", coverPath: "covers/cover2.jpeg"},
]

songItems.forEach((element, i) =>{
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//audioElement.play()

//Handle play/pause click
masterPlay.addEventListener('click' , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;

    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
     })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `audio/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex >= 6){
        songIndex = 0;
    }
    
    else{
        songIndex += 1;
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex <=0){
        songIndex = 0;
    }
    
    else{
        songIndex -= 1;
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
})