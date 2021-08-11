# Basic Batch
## The most basic of batches
### It's Brittney Batch

**Install**

```
npm install --save basic-batch
```

**Example**

```
const {
  setTimeout,
} = require('timers/promises');

const BasicBatch = require('basic-batch');
const batch = new BasicBatch;

batch.on('processReady', ({ items, done }) => {
	items.then(res => {
		console.log(res);
		done();
	});
});

batch.push(setTimeout(1000, 100)); // valid promise
batch.push(1000); // static value
batch.push(new Promise((resolve, reject) => { reject('WTF'); })); // rejected promise

batch.cleanup(); //make sure to run cleanup, this will flush the queue if you make it to the end of execution without hitting the limit
```

It's that basic
