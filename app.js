const neuralNetwork = require('./neuralNetwork.js'); 
const random = require('./random.js');
const fs = require('fs');

function runModel(input, modelName, callback){
    loadModel(modelName, (err, loadedModel) => {
        if (err) {
            console.error('Model does not exist. Generating a random one');
            getOutput(randomModel(), true);
        } else {
            console.log('Loaded Model: '+modelName);
            getOutput(loadedModel, false);
        }
    });

    function getOutput(model, save){
        callback(neuralNetwork.run([input], model[0], model[1], model[2], model[3], model[4], model[5])[0].toString());
        if(save){
            console.log('Saving the model');
            saveModel(modelName, model);
        }
    }
}
function trainModel(modelName, trainingIterations, adjustmentMin, adjustmentMax){
    fs.readFile('./models/'+modelName+'.txt', 'utf8', (err, data) => {
        if (err) {
           console.error('Invalid model. Please run this model before training it.');
        } else {
            var model = JSON.parse(data);
            var currentBest = { // Example data, will be random at some point
                model: model,
                output: neuralNetwork.run([3], model[0], model[1], model[2], model[3], model[4], model[5])[0],  // Actual output
                expectedOutput: 1   // Expected output
            };
            currentBest['loss'] = calculateLoss(currentBest.output, currentBest.expectedOutput); // Calculate loss

            var inititalLoss = currentBest.loss;

            console.log('Initital run: \nLoss: '+currentBest.loss.toString());

            // Loop through the correct amount of times
            for(var i = 0; i < trainingIterations; i++){
                const result = {
                    model: model,
                    output: neuralNetwork.run([3], model[0], model[1], model[2], model[3], model[4], model[5])[0],
                    expectedOutput: 1
                };
                result['loss'] = calculateLoss(result.output, result.expectedOutput);

                console.log('Iteration '+i.toString()+': \nLoss: '+currentBest.loss.toString());

                if(result.loss < currentBest.loss){ // Model improved
                    currentBest = result; // Update the current model to be the one we just made
                } else{
                    // Modify the model infomation
                    var newModel = [];

                    var modelIt = 0;

                    model.forEach(modelInfomation => {
                        modelIt++;
                        if(
                            modelIt == 1 ||
                            modelIt == 2 ||
                            modelIt == 5 ||
                            modelIt == 6
                        ){
                            newModel.push([modelInfomation[0]+random.getRandomNumber(adjustmentMin, adjustmentMax)]);
                        }
                        if(
                            modelIt == 3 ||
                            modelIt == 4
                        ){
                            var arrayPush = [];
                            arrayPush.push([modelInfomation[0][0]+random.getRandomNumber(adjustmentMin, adjustmentMax), modelInfomation[0][1]+random.getRandomNumber(adjustmentMin, adjustmentMax), modelInfomation[0][2]+random.getRandomNumber(adjustmentMin, adjustmentMax)]);
                            arrayPush.push([modelInfomation[1][0]+random.getRandomNumber(adjustmentMin, adjustmentMax), modelInfomation[1][1]+random.getRandomNumber(adjustmentMin, adjustmentMax), modelInfomation[1][2]+random.getRandomNumber(adjustmentMin, adjustmentMax)]);
                            newModel.push(arrayPush);
                        }
                    });

                    model = newModel;

                    console.log(JSON.stringify(newModel));
                }
                console.log('\n');
            }

            // Save the model
            saveModel(modelName, currentBest.model);
            console.log('Initial Loss: '+inititalLoss.toString()+'\nFinal Loss: '+currentBest.loss);
        }
    });
}
function saveModel(filename, modelArray) {
    fs.writeFileSync('./models/'+filename+'.txt', JSON.stringify(modelArray));
    console.log(`Model saved to ${'./models/'+filename+'.txt'}`);
}
function loadModel(filename, callback) {
    fs.readFile('./models/'+filename+'.txt', 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
        } else {
            const model = JSON.parse(data);
            callback(null, model);
        }
    });
}
function randomModel(){
    return [
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
    ];
}
function calculateLoss(predictedOutput, expectedOutput) {
    const error = predictedOutput - expectedOutput;
    return Math.pow(error, 2);
}

runModel(756743567, 'v1', (output)=>{ console.log(output) });

// trainModel('v1', 1000, -0.5, 0.5);