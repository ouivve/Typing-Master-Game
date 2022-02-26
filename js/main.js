const messageDisplay = document.querySelector("#message");
const currentWord = document.querySelector("#current-word");
const wordInput = document.querySelector("#word-input");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");

const GAME_TIME = 5;

let words = ["banana", "key", "car", "javascript", "apple"];
let score = 0;
let time = 0;
let timeInterver;
let isPlaying = false;

// 주어진 단어와 입력한 단어 비교
wordInput.addEventListener("input", (e) => {
  const typedText = e.target.value;
  const currentText = currentWord.innerText;
  // 대소문자 구분하지 않기
  if (typedText.toUpperCase() == currentText.toUpperCase()) {
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
