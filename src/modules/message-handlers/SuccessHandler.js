import PubSub from 'pubsub-js';

/**
 * Publish a message with success information
 */
class SuccessHandler {
	catcher(message) {
		this.pubMessage(message);
	}

	pubMessage(messageToPublis) {
		PubSub.publish('update-message', { show: true, message: messageToPublis, buttonLabel: 'ok' });
	}
}

export default SuccessHandler;
