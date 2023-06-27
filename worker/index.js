const workers = require('pushkin-worker');
const pWorker = workers.pushkinWorker;
const defaultHandler = workers.defaultHandler;
const ort = require('onnxruntime-node');

//
// Pulled from:
// https://github.com/microsoft/onnxruntime-inference-examples/blob/main/js/quick-start_onnxruntime-node/index.js
//

// use an async context to call onnxruntime functions.
async function main() {
    try {
        // create a new session and load the specific model.
        //
        // the model in this example contains a single MatMul node
        // it has 2 inputs: 'a'(float32, 3x4) and 'b'(float32, 4x3)
        // it has 1 output: 'c'(float32, 3x3)
        const session = await ort.InferenceSession.create('./model.onnx');

        // prepare inputs. a tensor need its corresponding TypedArray as data
        const dataA = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
        const dataB = Float32Array.from([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]);
        const tensorA = new ort.Tensor('float32', dataA, [3, 4]);
        const tensorB = new ort.Tensor('float32', dataB, [4, 3]);

        // prepare feeds. use model input names as keys.
        const feeds = { a: tensorA, b: tensorB };

        // feed inputs and run
        const results = await session.run(feeds);

        // read from results
        const dataC = results.c.data;
        console.log(`data of result tensor 'c': ${dataC}`);

    } catch (e) {
        console.error(`failed to inference ONNX model: ${e}.`);
    }
}

main();

const options = {
	amqpAddress: process.env.AMQP_ADDRESS || 'amqp://localhost',
	readQueue: 'pushkintemplate_quiz_dbread',
	writeQueue: 'pushkintemplate_quiz_dbwrite',
	taskQueue: 'pushkintemplate_quiz_taskworker',
};

const connection = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DB,
};

const transactionOps = {
	tableName: 'transactions',
	connection: {
			host: process.env.TRANS_HOST,
			user: process.env.TRANS_USER,
			password: process.env.TRANS_PASS,
			database: process.env.TRANS_DB,
	}
}

console.log(connection);

const worker = new pWorker(options);
worker.init()
	.then(() => {
		worker.handle('test', data => {
			console.log(`handling test method got data: ${data}`);
			return `successfully got ${data}`;
		});
		worker.useHandler(defaultHandler, connection, 'pushkintemplate', transactionOps);
		worker.start();
	})
	.catch(err => {
		console.error(`failed to initialize worker: ${err}`);
	});

