const selectPowerUp = (arr) => {
  const rarityNum = Math.floor(Math.random() * (100 - 1) + 1);
  let filteredArr = [];

  if (rarityNum <= 50) {
    filteredArr = arr.filter((pw) => pw.rarity === 'Common'); // 50
  } else if (rarityNum >= 51 && rarityNum <= 80) {
    filteredArr = arr.filter((pw) => pw.rarity === 'Uncommon'); // 30
  } else if (rarityNum >= 81 && rarityNum < 96) {
    filteredArr = arr.filter((pw) => pw.rarity === 'Rare'); // 15
  } else {
    filteredArr = arr.filter((pw) => pw.rarity === 'Legendary'); // 5
  }

  const randomPUIdx = Math.floor(Math.random() * (filteredArr.length - 1));
  return filteredArr[randomPUIdx];
};

const setPowerUp = (powerUps) => {
  const answer = 1; 
  // const randNum = 1;
  const randNum = Math.floor((Math.random() * 15));
  console.log('randNum', randNum);
  if (answer === randNum) {
    return selectPowerUp(powerUps);
  }
  return null;
};

module.exports = {
  setPowerUp,
};
