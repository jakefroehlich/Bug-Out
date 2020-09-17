const getPowerUp = (arr) => {
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

<<<<<<< HEAD
  return cookieStr
    .split(';')
    .map((s) => s.trim())
    .map((s) => s.split('='))
    .reduce(
      (cookieObj, [key, val]) => ({
        ...cookieObj,
        [key]: val,
      }),
      {},
    );
=======
  const randomPUIdx = Math.floor(Math.random() * (filteredArr.length - 1));
  return filteredArr[randomPUIdx];
>>>>>>> 0948bc37cdd5fdcee50a295f59f723bc893b5666
};

module.exports = {
  getPowerUp,
};
