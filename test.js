const {
  setTimeout,
} = require('timers/promises');

const BasicBatch = require('./index');
const batch = new BasicBatch;

batch.on('processReady', ({ items, done }) => {
	items.then(async res => {
		console.log(res);
		await setTimeout(10000, 100);
		done();
	});
});
batch.on('done', () => {
	console.log('Done');
});

batch.push(setTimeout(1000, 100));
batch.push(1000);
batch.push(new Promise((resolve, reject) => { reject('WTF'); }));

batch.cleanup();
