import PubSub from 'pubsub-js';

/**
 * Publish a message with defined error
 */
class ErrorHandler {
	catcher(error, message) {
		if (error.response) {
			switch (error.response.status) {
				case 400:
					this.pubMessage(message || '');
					break;
				default:
					this.pubMessage('Erro desconhecido até o momento');
					break;
			}
		} else if (error.request) {
			this.pubMessage('Erro de conexão com o servidor.');
		}
	}

	pubMessage(messageToPublis) {
		PubSub.publish('update-message', { show: true, message: messageToPublis, buttonLabel: 'ok' });
	}
}

export default ErrorHandler;
