// 配列初期化
let arr = Array.from({length: 10}, (_, i) => i + 1);
let current = arr.length - 1; // 右端からスタート
let finished = false;

function render() {
  const container = document.getElementById('card-container');
  container.innerHTML = '';
  arr.forEach((num, idx) => {
    const card = document.createElement('div');
    card.textContent = num;
    card.style.width = '40px';
    card.style.height = '60px';
    card.style.display = 'flex';
    card.style.alignItems = 'center';
    card.style.justifyContent = 'center';
    card.style.fontSize = '1.5em';
    card.style.border = '2px solid #333';
    card.style.borderRadius = '8px';
    card.style.background = idx > current ? '#ccc' : '#fff'; // 右端から灰色
    card.style.transition = 'background 0.3s, transform 0.5s, left 0.5s';
    container.appendChild(card);
  });
  document.getElementById('step-info').textContent =
    finished ? 'シャッフル完了！' : `残りステップ: ${current + 1}`;
}

function step() {
  if (finished) return;
  const i = current;
  const j = Math.floor(Math.random() * (current + 1)); // 0〜currentの範囲から選択
  const container = document.getElementById('card-container');
  const cards = container.children;

  // アニメーション: i番目とj番目のカードを入れ替える
  const distance = (j - i) * 48;
  cards[i].style.transform = `translateX(${distance}px) scale(1.1)`;
  cards[j].style.transform = `translateX(${-distance}px) scale(1.1)`;

  setTimeout(() => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    current--;
    if (current < 0) finished = true;
    render();
  }, 1000);
}

function reset() {
  arr = Array.from({length: 10}, (_, i) => i + 1);
  current = arr.length - 1; // 右端に戻す
  finished = false;
  render();
}

document.getElementById('step-btn').onclick = step;
document.getElementById('reset-btn').onclick = reset;

render();