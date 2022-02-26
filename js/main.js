const messageDisplay = document.querySelector("#message");
const currentWord = document.querySelector("#current-word");
const wordInput = document.querySelector("#word-input");
const timeDisplay = document.querySelector("#time");
const scoreDisplay = document.querySelector("#score");

let words = ["banana", "key", "car", "javascript", "apple"];

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

// 점수 추가
let score = 0;
const addCount = () => {
  score += 1;
  scoreDisplay.innerText = score;
};

// 단어 초기화
const setNewWord = () => {
  wordInput.value = "";
  messageDisplay.innerText = "Now Playing!!!";
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerText = words[randomIndex];
};
