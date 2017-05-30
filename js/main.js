const myNetwork = new synaptic.Architect.Perceptron(3, 5, 1);
const trainer = new synaptic.Trainer(myNetwork);

let app = new Vue({
    el: '#app',
    data: {
        slider1: 0.5,
        slider2: 0.5,
        slider3: 0.5,
        result: 0.5,
        badThreshold: 0.4,
        goodThreshold: 0.7,
        trainingSet: ""
    },
    computed: {
        resultText: function () {
            return this.result.toFixed(2);
        },
        classObject: function () {
            return {
                active: true,
                'label': true,
                'label-success': this.result >= this.goodThreshold,
                'label-warning': this.result >= this.badThreshold && this.result < this.goodThreshold,
                'label-danger': this.result < this.badThreshold
            }
        }
    },
    methods: {
        activate: function () {
            this.result = myNetwork.activate([this.slider1, this.slider2, this.slider3])[0];
        },
        train: function () {
            myNetwork.reset();
            const tsPromise = Promise.resolve(JSON.parse(this.trainingSet));
            const options = {
                rate: .1,
                iterations: 20000,
                error: .005,
                shuffle: true,
                log: 1000,
                cost: synaptic.Trainer.cost.CROSS_ENTROPY
            };
            tsPromise.then(ts => {
                trainer.train(ts, options);
                this.activate();
            });
        },
        setFile: function (event) {
            const file = event.target.files[0];
            if(!file) return;
            const r = new FileReader();
            r.onload = (e) => {
                this.trainingSet = r.result;
            };
            r.readAsText(file);
        }
    }
});
