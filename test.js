const {
  setTimeout,
} = require('timers/promises');

const BasicBatch = require('./index');
const batch = new BasicBatch;

batch.on('processReady', ({ items, done }) => {
	items.then(res => {
		console.log(res);
		done();
	});
});

batch.push(setTimeout(1000, 100));
batch.push(1000);
batch.push(new Promise((resolve, reject) => { reject('WTF'); }));

batch.cleanup();
