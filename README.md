# Basic Batch
## The most basic of batches
### It's Brittney Batch

**Install**

```
npm install --save basic-batch
```

**Why?**

Let's say you just ran a gigantic query of 1MM rows and you want to do some http requests or some post processing then upload batches 1000 at a time to another table. I find this to be a pretty common pattern as I don't want to eat up all my network connections by making one call per database entry, but I also don't want to eat up all my memory by leaving all 1MM messages in an array until I'm ready to put them all in one massive insert.

Enter Basic Batch...

Basic Batch allows you to queue up your items or Promises and then process them in chunk sizes of your liking. `(defaults to 100)`

**How?**

When you create a batch you tell it how many items should be grouped into what I call a `process`. A `process` is essentially just an array of items or Promises that are assigned a unique id.
When you call batch.push(item | Promise) you are pushing that item into a temporary array (the `queue`). Once the `queue` reaching your batch size it will flush those items to a `process` and call the `processReady` event. The `processReady` event returns an object containing two properties. Your `items` which will be returned from `Promise.allSettled()` and a `done()` function that you can call once you've completed processing on that... `process` : )

**Events?**
Ye, this is just a simple extension of the Node.js `EventEmitter`...which is pretty cool and I encourage you to read all about it some other time. Until then check out a quick code example below and hopeully it will all make sense ;)

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
