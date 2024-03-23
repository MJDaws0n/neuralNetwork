// Helper function: Sigmoid activation function
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function neuralNetwork(inputs, inputWeights, inputBiases, hiddenWeights, hiddenBiases, outputWeights, outputBiases) {
    // Model settings
    const settings = {
        input: 1,
        hiddenLayers: 2,
        neuronsPerLayer: 3,
        outputs: 1
    };

    var outputs = [];

    for(var i = 0; i < settings.input; i++){
        const input = inputs[i];
        const weight = inputWeights[i];
        const bias = inputBiases[i];

        const output = sigmoid(input * weight + bias);

        for(var j = 0; j < settings.hiddenLayers; j++){
            for(var k = 0; k < settings.neuronsPerLayer; k++){
                const hiddenWeight = hiddenWeights[j][k];
                const hiddenBias = hiddenBiases[j][k];
    
                const hiddenOutput = sigmoid(output * hiddenWeight + hiddenBias);

                for(var m = 0; m < settings.outputs; m++){
                    const outputWeight = outputWeights[m];
                    const outputBias = outputBiases[m];
        
                    const output = sigmoid(hiddenOutput * outputWeight + outputBias);
                    outputs.push(output);
                }
            }
        }
    }

    // We have a list of all the ouputs, we must just aggregate them
    function aggregateOutputs(outputs, numOfOutputs) {
        let aggregatedOutputs = [];
        let chunkSize = Math.ceil(outputs.length / numOfOutputs);
    
        for (let i = 0; i < outputs.length; i += chunkSize) {
            let chunk = outputs.slice(i, i + chunkSize);
            let average = chunk.reduce((acc, curr) => acc + curr, 0) / chunk.length;
            aggregatedOutputs.push(average);
        }
    
        return aggregatedOutputs;
    }
    // Aggregate the outputs
    var aggregatedOutputs = aggregateOutputs(outputs, settings.outputs);

    return aggregatedOutputs;
}
module.exports = {
    run: neuralNetwork
};