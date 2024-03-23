function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function generateRandomWeights(numWeights, min, max) {
    const weights = [];
    for (let i = 0; i < numWeights; i++) {
        weights.push(getRandomNumber(min, max));
    }
    return weights;
}
function generateRandomBiases(num, min, max) {
    const biases = [];
    for (let i = 0; i < num; i++) {
        biases.push(getRandomNumber(min, max));
    }
    return biases;
}
module.exports = {
    generateRandomWeights: generateRandomWeights,
    generateRandomBiases: generateRandomBiases,
    getRandomNumber: getRandomNumber
};