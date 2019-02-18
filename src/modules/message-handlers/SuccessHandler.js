import PubSub from 'pubsub-js';

/**
 * Publish a message with success information
 */
class SuccessHandler {
	constructor(message) {
		this.message = message;
	}

	dispatcher() {
		if (this.message) {
			this.pubMessage(this.message);
		}
		return this;
	}

	/**
	 * Publish a message to listner to load new data
	 */
	publishToLoad() {
		PubSub.publish('load-new-data', { load: true });
	}

	pubMessage(messageToPublis) {
		PubSub.publish('update-message', { show: true, message: messageToPublis, buttonLabel: 'ok' });
	}
}

export default SuccessHandler;
