function getRandomPairs(list, count = 10) {
  const shuffled = list.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

module.exports = { getRandomPairs }
