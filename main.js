const getRandomImages = function (count) {
  const numberArray = [];
  for (let i = 1; i <= 52; i++) {
    numberArray.push(i);
  }
  const shuffledNumberArray = numberArray.sort(() => Math.random() - 0.5); // シャッフル
  return shuffledNumberArray.slice(0, count); // 最初のcount個を取得
};
const RefleshButton = document.getElementById("reflesh");
const Yaku = document.getElementById("yaku");
const displayRandomCards = function () {
  const CardContainer = document.getElementById("card-container");
  console.log(CardContainer);
  CardContainer.innerHTML = ""; // コンテナを初期化
  const cardFlipSound = new Audio("カードをめくる.mp3");
  const randomImages = getRandomImages(5); // 1から52の中からランダムに5枚選択
  console.log(randomImages);
  const getCardInfo = (cardNumber) => {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const rank = ((cardNumber - 1) % 13) + 1; // 1～13
    const suit = suits[Math.floor((cardNumber - 1) / 13)];
    return { rank, suit };
  };

  // ランクの頻度をカウント
  const countRanks = (cards) => {
    const rankCounts = {};
    cards.forEach((card) => {
      rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    });
    return rankCounts;
  };

  // スートの種類をカウント
  const countSuits = (cards) => {
    const suitCounts = {};
    cards.forEach((card) => {
      suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    });
    return suitCounts;
  };

  // 役を判定する関数
  const determineHand = (cards) => {
    const rankCounts = countRanks(cards);
    const suitCounts = countSuits(cards);

    const rankFrequencies = Object.values(rankCounts).sort((a, b) => b - a);
    const isFlush = Object.keys(suitCounts).length === 1;

    // ソートされたランクの配列
    const ranks = Object.keys(rankCounts)
      .map(Number)
      .sort((a, b) => a - b);
    const isStraight = ranks.length === 5 && ranks[4] - ranks[0] === 4;

    // ロイヤルストレート（10, 11, 12, 13, 1）
    const isRoyalStraight =
      JSON.stringify(ranks) === JSON.stringify([1, 10, 11, 12, 13]);

    if (isStraight && isFlush && isRoyalStraight) return "ロイヤルフラッシュ";
    if (isStraight && isFlush) return "ストレートフラッシュ";
    if (rankFrequencies[0] === 4) return "フォーカード";
    if (rankFrequencies[0] === 3 && rankFrequencies[1] === 2)
      return "フルハウス";
    if (isFlush) return "フラッシュ";
    if (isStraight || (isStraight && ranks.includes(1))) return "ストレート";
    if (rankFrequencies[0] === 3) return "スリーカード";
    if (rankFrequencies[0] === 2 && rankFrequencies[1] === 2) return "ツーペア";
    if (rankFrequencies[0] === 2) return "ワンペア";
    return "ハイカード";
  };

  // 選んだ5枚のカード（1～52の配列）
  const selectedCards = randomImages; // ハートの2, ダイヤの2, クラブの2, スペードの2, ハートの1

  // 選んだカードの情報を取得
  const cards = selectedCards.map(getCardInfo);
  const result = determineHand(cards);
  randomImages.forEach((num, index) => {
    setTimeout(() => {
      const img = document.createElement("img");
      img.src = `images/cards/torannpu-illust${num}.png`; // 画像のパスを指定
      img.alt = `Image ${num}`;
      img.className = "card-image";
      img.style.width = "100px";
      img.style.margin = "5px";

      CardContainer.appendChild(img);

      // 効果音を再生
      cardFlipSound.currentTime = 0; // 再生位置をリセット
      cardFlipSound.play();
    }, index * 500); // 0.5秒ごとにカードを描画
  });
  Yaku.textContent = result;
};
displayRandomCards();
RefleshButton.onclick = displayRandomCards;
