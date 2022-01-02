window.onload = () => {
  document.querySelector(".link").onclick = () => {
    document.querySelector(".menu").style.display = "none";
    startGame();
  };

  document.querySelector(".resetWin").onclick = () => {
    game.resetPlayer()
    game.resetLifes()
    document.querySelector('#myCanvas').style.display = 'initial'
    document.querySelector('.controls').style.display = 'initial'
    document.querySelector('.youWin').style.display = 'none'
    startGame();
  }

  document.querySelector(".resetLoose").onclick = () => {
    game.resetPlayer()
    game.resetLifes()
    document.querySelector('#myCanvas').style.display = 'initial'
    document.querySelector('.controls').style.display = 'initial'
    document.querySelector('.youLoose').style.display = 'none'
    startGame();
  }

  function startGame() {
    document.querySelector(".game").style.display = "flex";
    game.init();
  }
  }