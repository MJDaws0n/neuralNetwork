const neuralNetwork = require('./neuralNetwork.js'); 
const random = require('./random.js'); 

console.log(neuralNetwork.run(
    [2], 
    random.generateRandomWeights(1, -1, 1),
    random.generateRandomBiases(1, -1, 1),
    [
        random.generateRandomWeights(3, -1, 1),
        random.generateRandomWeights(3, -1, 1)
    ],
    [
        random.generateRandomBiases(3, -1, 1),
        random.generateRandomBiases(3, -1, 1)
    ],
    random.generateRandomWeights(1, -1, 1),
    random.generateRandomBiases(1, -1, 1)
));