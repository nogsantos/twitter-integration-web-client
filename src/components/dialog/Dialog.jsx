import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import blue from '@material-ui/core/colors/blue';

const emails = ['nogsantos@gmail.com'];

const styles = {
	avatar: {
		backgroundColor: blue[100],
		color: blue[600]
	}
};

class AppDialog extends Component {
	handleClose = () => {
		this.props.onClose(this.props.selectedValue);
	};

	handleListItemClick = value => {
		this.props.onClose(value);
		document.execCommand('copy');
	};

	render() {
		const { classes, onClose, selectedValue, ...other } = this.props;

		return (
			<Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
				<DialogTitle id="simple-dialog-title">Entre em contato</DialogTitle>
				<List>
					{emails.map(email => (
						<ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
							<ListItemAvatar>
								<Avatar
									alt="Fabricio Nogueira"
									src="https://avatars1.githubusercontent.com/u/570926?s=460&v=4"
									className={classes.avatar}
								>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={email} />
						</ListItem>
					))}
				</List>
			</Dialog>
		);
	}
}

AppDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func,
	selectedValue: PropTypes.string
};

export default withStyles(styles)(AppDialog);
