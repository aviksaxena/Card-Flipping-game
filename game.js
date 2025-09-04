const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let cards = [];
let flipped = [];
let matched = 0;
let moves = 0;

const icons = ['🍎','🍌','🍇','🍒','🍉','🍓','🍍','🥝'];

function initGame() {
  board.innerHTML = '';
  flipped = [];
  matched = 0;
  moves = 0;
  status.textContent = 'Moves: 0';

  cards = [...icons, ...icons]  // duplicate for pairs
    .sort(() => Math.random() - 0.5);

  cards.forEach((icon, i) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.icon = icon;
    div.dataset.index = i;
    div.textContent = '';
    div.addEventListener('click', flipCard);
    board.appendChild(div);
  });
}

function flipCard(e) {
  const card = e.target;
  if (card.classList.contains('flipped') || flipped.length === 2) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.icon;
  card.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.3s';
  card.style.transform = 'rotateY(180deg) scale(1.08)';
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    status.textContent = 'Moves: ' + moves;
    setTimeout(checkMatch, 700);
  }
}

function checkMatch() {
  const [c1, c2] = flipped;
  if (c1.dataset.icon === c2.dataset.icon) {
    matched += 2;
    // Add win animation to matched cards
    c1.classList.add('win');
    c2.classList.add('win');
    setTimeout(() => {
      c1.classList.remove('win');
      c2.classList.remove('win');
    }, 700);
    if (matched === cards.length) {
      setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
          card.classList.add('win');
          setTimeout(() => card.classList.remove('win'), 900);
        });
        setTimeout(() => alert('🎉 You won in ' + moves + ' moves!'), 950);
      }, 300);
    }
  } else {
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      c1.textContent = '';
      c2.textContent = '';
      c1.style.transform = '';
      c2.style.transform = '';
    }, 350);
  }
  flipped = [];
}

resetBtn.addEventListener('click', initGame);
initGame();
