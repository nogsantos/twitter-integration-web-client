import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import PubSub from 'pubsub-js';

const styles = theme => ({
	close: {
		padding: theme.spacing.unit / 2
	}
});

class AppSnackBar extends Component {
	queue = [];

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			message: '',
			buttonLabel: '',
			messageInfo: {}
		};
	}

	componentWillMount() {
		PubSub.subscribe('update-message', (topic, action) => {
			let message = action.message;
			this.setState({
				message: action.message,
				buttonLabel: action.buttonLabel
			});
			this.queue.push({
				message,
				key: new Date().getTime()
			});
			if (this.state.open) {
				this.setState({ open: false });
			} else {
				this.processQueue();
			}
		});
	}

	processQueue = () => {
		if (this.queue.length > 0) {
			this.setState({
				open: true,
				message: this.state.message,
				buttonLabel: this.state.buttonLabel,
				messageInfo: this.queue.shift()
			});
		}
	};

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false });
	};

	handleExited = () => {
		this.processQueue();
	};

	render() {
		const { classes } = this.props;
		const { open, message, buttonLabel } = this.state;
		return (
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={6000}
				onClose={this.handleClose}
				onExited={this.handleExited}
				ContentProps={{
					'aria-describedby': 'message-id'
				}}
				message={<span id="message-id">{message}</span>}
				action={[
					<Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
						{buttonLabel.toUpperCase()}
					</Button>,
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={this.handleClose}
					>
						<CloseIcon />
					</IconButton>
				]}
			/>
		);
	}
}

AppSnackBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppSnackBar);
