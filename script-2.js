const petsModule = (function () {
  const _data = [
    {
      image: 'https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg',
      name: 'Sam',
      type: 'Golden Retriever/St. Bernard Mix',
      sound: 'bark',
      soundText: 'Bark - type b',
      eventKey: 'b',
    },
    {
      image: 'https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg',
      name: 'Mellie',
      type: 'Domestic Shorthair',
      sound: 'meow',
      soundText: 'Meow - type m',
      eventKey: 'm',
    },
    {
      image:
        'https://i2.cnnturk.com/i/cnnturk/75/650x325/53cf8a55f63099154cd56e93.jpg',
      name: 'Bahadir',
      type: 'Elephant',
      sound: 'elephant',
      soundText: 'Elephant - type e',
      eventKey: 'e',
    },
    {
      image:
        '//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg/220px-Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg',
      name: 'Loki',
      type: 'Tiger',
      sound: 'roar-tiger',
      soundText: 'Tiger - type t',
      eventKey: 't',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg',
      name: 'Simba',
      type: 'Lion',
      sound: 'roar-lion',
      soundText: 'Lion - type l',
      eventKey: 'l',
    },
  ];
  const $tbodyEl = document.querySelector('tbody');
  const $petImageEl = document.getElementsByClassName('main-image')[0];
  const $bodyEl = document.body;

  const getButtons = function () {
    return document.querySelectorAll('button');
  };

  const createPetElement = (pet) => {
    return `<tr><td><img class='pet-image' src=${pet.image} /></td>
      <td>${pet.name}</td>
      <td>${pet.type}</td>
      <td><button data-sound=${pet.sound}>${pet.soundText}</button></td></tr>`;
  };

  const createAndAppendAudioElements = () => {
    _data.map((pet) => {
      const $audio = document.createElement('audio');
      $audio.setAttribute('src', `sounds/${pet.sound}.mp3`);
      $audio.setAttribute('id', pet.sound);
      $bodyEl.append($audio);
    });
  };

  const addToTable = function (content) {
    $tbodyEl.innerHTML += content;
  };

  const putPetsInHtml = function () {
    for (let i = 0; i < _data.length; i++) {
      addToTable(createPetElement(_data[i]));
    }
  };

  const bindClickEventsToButtons = () => {
    const $buttons = getButtons();
    $buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        pausePlayingAudio(); // diger sesleri sustur
        e.stopPropagation();
        const soundId = btn.getAttribute('data-sound');
        const $soundEl = document.getElementById(soundId);
        if ($soundEl) {
          $soundEl.play();
        }
      });
    });
  };

  const getTableRows = function () {
    return document.querySelectorAll('tr');
  };

  const pausePlayingAudio = () => {
    const $allSoundEl = document.querySelectorAll('audio');
    $allSoundEl.forEach((el) => {
      el.pause(); // baska bir butona tiklandiginda diger seslerin susmasi
      el.currentTime = 0;
    });
  };

  const changeBackgroundAndImageOnRowClick = () => {
    const $tableRows = getTableRows();
    $tableRows.forEach((row, i) => {
      if (i > 0) {
        // ilk row thead orda islem yapmiyoruz
        row.addEventListener('click', () => {
          // sadece tiklanan row'da background degisikligi
          pausePlayingAudio(); // diger sesleri sustur
          $tableRows.forEach((row) => {
            if (row.classList.contains('clicked')) {
              row.classList.remove('clicked');
            }
          });
          row.classList.add('clicked');
          $petImageEl.src = row.getElementsByTagName('img')[0].src; // satira tiklandiginda pet resmi degistir
          $rowsButton = row.getElementsByTagName('button')[0]; // satira tiklandiginda satira ait butonun calismasi
          if ($rowsButton) {
            $rowsButton.click();
          }
        });
      }
    });
  };

  const listenForKeydown = () => {
    $bodyEl.addEventListener('keydown', function (e) {
      pausePlayingAudio(); // diger sesleri sustur
      _data.map((pet) => {
        if (e.key === pet.eventKey) {
          const $soundEl = document.getElementById(pet.sound);
          if ($soundEl) {
            $soundEl.play();
          }
        }
      });
    });
  };

  const init = function () {
    putPetsInHtml();
    createAndAppendAudioElements();
    bindClickEventsToButtons();
    changeBackgroundAndImageOnRowClick();
    listenForKeydown();
  };

  return {
    init: init,
  };
})();
