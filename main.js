const getRandomImages = function (count) {
  const numberArray = [];
  for (let i = 1; i <= 52; i++) {
    numberArray.push(i);
  }
  const shuffledNumberArray = numberArray.sort(() => Math.random() - 0.5); // シャッフル
  return shuffledNumberArray.slice(0, count); // 最初のcount個を取得
};

const displayRandomCards = function () {
  const CardContainer = document.getElementById("card-container");
  console.log(CardContainer);
  CardContainer.innerHTML = ""; // コンテナを初期化

  const randomImages = getRandomImages(5); // 1から52の中からランダムに5枚選択
  randomImages.forEach((num, index) => {
    const img = document.createElement("img");
    img.src = `images/cards/torannpu-illust${num}.png`; // 画像のパスを指定
    img.alt = `Image ${num}`;
    img.style.width = "100px"; // サイズ調整
    img.style.margin = "5px"; // 間隔調整
    img.className = "card-image"; // CSSクラスを適用
    img.style.animationDelay = `${index * 0.2}s`; // 遅延を設定
    CardContainer.appendChild(img);
  });
};
displayRandomCards();
