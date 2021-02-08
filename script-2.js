const petsModule = (function () {
  const _data = [
    {
      image: 'https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg',
      name: 'Sam',
      type: 'Golden Retriever/St. Bernard Mix',
      sound: 'bark',
      soundText: 'Bark - type b',
    },
    {
      image: 'https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg',
      name: 'Mellie',
      type: 'Domestic Shorthair',
      sound: 'meow',
      soundText: 'Meow - type m',
    },
    {
      image:
        'https://i2.cnnturk.com/i/cnnturk/75/650x325/53cf8a55f63099154cd56e93.jpg',
      name: 'Bahadir',
      type: 'Elephant',
      sound: 'elephant',
      soundText: 'Elephant - type e',
    },
    {
      image:
        '//upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg/220px-Bengal_tiger_%28Panthera_tigris_tigris%29_female_3_crop.jpg',
      name: 'Loki',
      type: 'Tiger',
      sound: 'roar-tiger',
      soundText: 'Tiger - type t',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg',
      name: 'Simba',
      type: 'Lion',
      sound: 'roar-lion',
      soundText: 'Lion - type l',
    },
  ];
  const $tbodyEl = document.querySelector('tbody');
  const $petImageEl = document.getElementsByClassName('main-image');
  const $bodyEl = document.body;

  const getButtons = function () {
    return document.querySelectorAll('button');
  };

  const createPetElement = function (pet) {
    return (
      "<tr><td><img class='pet-image' src='" +
      pet.image +
      "' /></td><td>" +
      pet.name +
      '</td><td>' +
      pet.type +
      "</td><td><button data-sound='" +
      pet.sound +
      "'>" +
      pet.soundText +
      '</button></td></tr>'
    );
  };

  const addToTable = function (content) {
    $tbodyEl.innerHTML += content;
  };

  const putPetsInHtml = function () {
    for (let i = 0; i < _data.length; i++) {
      addToTable(createPetElement(_data[i]));
    }
  };

  const bindEvents = function () {
    const buttons = getButtons();
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (event) {
        event.stopPropagation(); // butona basildiginda table row'a basilinca calisacak olan seyler calismasin
        const soundId = this.dataset.sound;
        const soundElement = document.getElementById(soundId);
        if (soundElement) {
          soundElement.play();
        }
      });
    }
  };

  const getTableRows = function () {
    return document.querySelectorAll('tr');
  };

  const changeBackground = function () {
    const tableRows = getTableRows();
    for (let i = 0; i < tableRows.length; ++i) {
      tableRows[i].addEventListener('click', function () {
        // Sutun basliklarinin oldugu satirda renk degisimi yapma
        if (i !== 0) {
          tableRows[i].classList.toggle('clicked'); // class ekleyerek rengini degistir
        }
        $petImageEl[0].src = tableRows[i].getElementsByTagName('img')[0].src; // satira tiklandiginda pet resmi degistir
      });
    }
  };

  const listenForKeydown = function () {
    $bodyEl.addEventListener('keydown', function (e) {
      console.log(e.keyCode);
      if (e.keyCode === 66) {
        // b tusuna basilirsa
        document.getElementById('bark').play();
      } else if (e.keyCode === 77) {
        // m tusuna basilirsa
        document.getElementById('meow').play();
      } else if (e.keyCode === 84) {
        // t tusuna basilirsa
        document.getElementById('roar-tiger').play();
      } else if (e.keyCode === 69) {
        // e tusuna basilirsa
        document.getElementById('elephant').play();
      } else if (e.keyCode === 76) {
        // e tusuna basilirsa
        document.getElementById('roar-lion').play();
      }
    });
  };

  const init = function () {
    putPetsInHtml();
    bindEvents();
    changeBackground();
    listenForKeydown();
  };

  return {
    init: init,
  };
})();
