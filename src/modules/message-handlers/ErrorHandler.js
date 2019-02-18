import PubSub from 'pubsub-js';

/**
 * Publish a message with defined error
 */
class ErrorHandler {
	constructor(error) {
		this.error = error;
	}

	catcher() {
		if (this.error.response) {
			switch (this.error.response.data.status) {
				case 400:
					this.pubMessage(this.error.response.data.message);
					break;
				case 404:
					this.pubMessage('Recurso não localizado');
					break;
				default:
					this.pubMessage('Erro desconhecido, até o momento');
					break;
			}
		} else if (this.error.request) {
			this.pubMessage('Erro de conexão com o servidor.');
		}
	}

	pubMessage(messageToPublis) {
		PubSub.publish('update-message', { show: true, message: messageToPublis, buttonLabel: 'ERRO' });
	}
}

export default ErrorHandler;
