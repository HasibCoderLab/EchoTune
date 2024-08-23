let progress =document.getElementById('progress');
        let song =document.getElementById('song');
        let ctrlIcoon =document.getElementById('ctrlIcon');

        song.onloadedmetadata = function (){
            progress.max = song.duration;
            progress.value = song.current;

        }



        function playPause(){
            if(ctrlIcon.classList.contains('bx bx-pause')){
                song.pause();
                    ctrlIcon.classList.remove('bx bx-pause');
                    ctrlIcon.classList.add('bx bx-play');
                    

            }

            else{
                song.play();
                ctrlIcon.classList.add('bx bx-pause');
                ctrlIcon.classList.remove('bx bx-play')

            }
        }


        if(song.play()){
setInterval(() => {
    progress.value = song.currentTime;
    
}, 500);
        }
        progress.onchange = function(){
            song.play();
            song.currentTime = progress.value;
            ctrlIcon.classList.add('bx bx-pause');
                ctrlIcon.classList.remove('bx bx-play')

        };