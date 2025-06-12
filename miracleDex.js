let miracles = [];
let currentIndex = 0;
const BATCH_SIZE = 6;

const grid = document.getElementById('miracle-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');

async function loadMiracles() {
  try {
    const res = await fetch("https://gist.githubusercontent.com/trevortomesh/7bbf97b2fbae96639ebf1a254b6a7a70/raw/miracles.json");
    miracles = await res.json();
    showNextBatch();
  } catch (err) {
    console.error("Failed to fetch miracles:", err);
  }
}

function showNextBatch() {
  const nextBatch = miracles.slice(currentIndex, currentIndex + BATCH_SIZE);
  nextBatch.forEach(createCard);
  currentIndex += BATCH_SIZE;

  if (currentIndex >= miracles.length) {
    loadMoreBtn.style.display = 'none';
  }
}

function createCard(miracle) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.textContent = `${miracle.title} – ${miracle.location} (${miracle.year})`;
  card.addEventListener('click', () => openModal(miracle));

  grid.appendChild(card);
}

function openModal(miracle) {
  document.getElementById('modal-title').textContent = miracle.title;
  document.getElementById('modal-location').textContent = `Location: ${miracle.location}`;
  document.getElementById('modal-year').textContent = `Year: ${miracle.year}`;
  document.getElementById('modal-summary').textContent = miracle.summary;
  document.getElementById('modal-details').textContent = miracle.details;
  document.getElementById('modal-category').textContent = `Category: ${miracle.category}`;
  document.getElementById('modal-type').textContent = `Type: ${miracle.type}`;
  modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));
loadMoreBtn.addEventListener('click', showNextBatch);

loadMiracles();
