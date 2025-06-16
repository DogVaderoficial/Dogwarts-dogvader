
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');
    const resultSection = document.getElementById('result');
    const crestImg = document.getElementById('crestImage');
    const houseDesc = document.getElementById('houseDescription');
    const restartBtn = document.getElementById('restart');
    const shareWhats = document.getElementById('shareWhats');
    const shareInsta = document.getElementById('shareInsta');
    const audio = document.getElementById('bgAudio');
    const audioToggle = document.getElementById('audioToggle');

    const descriptions = {
        'Latifinória': 'Cães de coragem inabalável e lealdade feroz. Sempre prontos para proteger sua matilha!',
        'Sonobrinna': 'Inteligentes, observadores e estrategistas natos. Planejam cada passo com precisão.',
        'Rolofraw': 'Criativos e curiosos, exploram o mundo com olfato aguçado e mente aberta.',
        'Lambelufa': 'Companheiros doces e amorosos. Espalham carinho por onde passam.'
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const tally = {};
        for (let entry of data.values()){
            tally[entry] = (tally[entry] || 0) + 1;
        }
        let topHouse = Object.keys(tally).reduce((a,b) => tally[a] > tally[b] ? a : b);
        showResult(topHouse);
    });

    function showResult(house){
        document.getElementById('quiz').classList.add('hidden');
        resultSection.classList.remove('hidden');
        crestImg.src = `images/crest_${house.toLowerCase()}.png`;
        houseDesc.textContent = descriptions[house];
        shareWhats.onclick = () => {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(`Meu cão foi selecionado para ${house} em Dogwarts! 🐾✨`);
            window.open(`https://wa.me/?text=${text}%20${url}`,'_blank');
        };
        shareInsta.onclick = () => {
            if (navigator.share){
                navigator.share({
                    title: 'Dogwarts',
                    text: `Meu cão foi selecionado para ${house} em Dogwarts! 🐾✨`,
                    url: window.location.href
                });
            } else {
                alert('Compartilhamento direto não suportado no seu dispositivo. Copie o link: ' + window.location.href);
            }
        };
    }

    restartBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        document.getElementById('quiz').classList.remove('hidden');
        form.reset();
    });

    // Audio controls
    audio.volume = 0.2;
    audioToggle.addEventListener('click', () => {
        if (audio.paused){
            audio.play();
            audioToggle.textContent = '🔈';
        } else {
            audio.pause();
            audioToggle.textContent = '🔊';
        }
    });
});
