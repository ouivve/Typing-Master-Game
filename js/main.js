const messageDisplay = document.querySelector("#message");
const currentWord = document.querySelector("#current-word");
const wordInput = document.querySelector("#word-input");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");

const GAME_TIME = 5;
const API_URL = "https://random-word-api.herokuapp.com/word?number=1000";

let words = ["banana", "key", "car", "javascript", "apple"];
let score = 0;
let time = 0;
let timeInterver;
let isPlaying = false;
let isReady = false;
let gameMode;

init();

// function init() {
//   const res = fetch(API_URL)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => (words = data));
// }

// async await
async function init() {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);
  if (gameMode === "Easy") words = data.filter((item) => item.length < 4);
  else if (gameMode === "Medium")
    words = data.filter((item) => item.length < 7);
  else words = data.filter((item) => item.length < 15);

  isReady = true;
}

// 주어진 단어와 입력한 단어 비교
wordInput.addEventListener("input", (e) => {
  const typedText = e.target.value;
  const currentText = currentWord.innerText;
  // 대소문자 구분하지 않기
  if (typedText.toUpperCase() == currentText.toUpperCase() && isReady) {
    addCount();
    setNewWord();
  }
});
// 단어 초기화
const setNewWord = () => {
  time = GAME_TIME;
  wordInput.value = "";
  messageDisplay.innerText = "Now Playing!!!";
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerText = words[randomIndex];

  if (!isPlaying) {
    timeInterver = setInterval(countDown, 1000);
    isPlaying = true;
  }
};

// 시간 카운트다운
function countDown() {
  time -= 1;
  timeDisplay.innerText = time;
  if (time === 0) gameOver();
}

// 타임오버
function gameOver() {
  isPlaying = false;
  clearInterval(timeInterver);
  timeInterver = null;
  messageDisplay.innerText = "GAME OVER!";
  score = 0;
}

// 점수 추가
const addCount = () => {
  score += 1;
  scoreDisplay.innerText = score;
};

// 게임 모드 초급, 중급, 상급 선택하기

const easyButton = document.querySelector("#easy-mode");
const easyMode = easyButton.addEventListener("click", (e) => {
  gameMode = "Easy";
  init();
  easyButton.classList.add("active");
  mediumButton.classList.remove("active");
  hardButton.classList.remove("active");
});

const mediumButton = document.querySelector("#medium-mode");
mediumButton.addEventListener("click", (e) => {
  gameMode = "Medium";
  init();
  mediumButton.classList.add("active");
  easyButton.classList.remove("active");
  hardButton.classList.remove("active");
});

const hardButton = document.querySelector("#hard-mode");
hardButton.addEventListener("click", (e) => {
  gameMode = "Hard";
  init();
  hardButton.classList.add("active");
  easyButton.classList.remove("active");
  mediumButton.classList.remove("active");
});
