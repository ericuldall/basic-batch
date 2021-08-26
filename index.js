const suid = require('short-unique-id');
const uid = new suid();
const EventEmitter = require('events');
class Batch extends EventEmitter {
	constructor(length=100) {
		super();
		this.length = length;
		this.queue = [];
		this.processes = {};
		this.running = true;

		return this;
	}

	push (item) {
		this.running = true;
		if (this.queue.length === this.length) {
			this.drainQueue();
		}
		this.queue.push(Promise.resolve(item));
	}

	drainQueue () {
		const pid = uid();
		this.processes[pid] = Promise.allSettled(this.queue);
		this.queue = [];
		this.emit('processReady', { items: this.processes[pid], done: () => { this.markProcessComplete(pid); } });
	}

	markProcessComplete (pid) {
		delete this.processes[pid];
		if (Object.keys(this.processes).length === 0) {
			if (this.queue.length) {
				this.drainQueue();
			} else {
				this.emit('done');
			}
			this.running = false;
		}
	}

	cleanup () {
		if (this.running && !Object.keys(this.processes).length) {
			this.running = false;
			this.drainQueue();
		}
	}
}

module.exports = Batch;
