var myNetwork = new synaptic.Architect.Perceptron(3, 5, 1);
var trainer = new synaptic.Trainer(myNetwork);

var app = new Vue({
	el: '#app',
	data: {
		slider1: 0.5,
		slider2: 0.5,
		slider3: 0.5,
		result: 0.5,
		badThreshold: 0.4,
		goodThreshold: 0.7,
		trainingSet: "[{\"input\": [0,0,0],\"output\": [0]},\n{\"input\": [0,1,0],\"output\": [1]},\n{\"input\": [1,0,0],\"output\": [1]},\n{\"input\": [1,1,0],\"output\": [0]}]"
	},
	computed: {
        resultText: function () {
            return this.result.toFixed(2);
        },
        classObject: function(){ return {
                active: true,
                'label': true,
                'label-success': this.result >= this.goodThreshold,
                'label-warning': this.result >= this.badThreshold && this.result < this.goodThreshold,
                'label-danger': this.result < this.badThreshold
            }
        }
    },
	methods: {
		activate: function() {
			this.result = myNetwork.activate([this.slider1, this.slider2, this.slider3])[0];
		},
		train: function() {
			var ts = JSON.parse(this.trainingSet);
			var options = {
				rate: .1,
				iterations: 20000,
				error: .005,
				shuffle: false,
				log: 1000,
				cost: synaptic.Trainer.cost.CROSS_ENTROPY
			};
			trainer.train(ts, options);
			this.activate();
		}
	}
});
