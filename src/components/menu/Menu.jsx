import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';

import { AppContext } from '../../providers/app-context';
import AppDialog from '../dialog/';
const emails = ['nogsantos@gmail.com'];
const styles = theme => ({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	}
});

class Menu extends Component {
	state = {
		open: false,
		selectedValue: emails[1]
	};

	handleClickOpen = () => {
		this.setState({
			open: true
		});
	};

	handleClose = value => {
		this.setState({ selectedValue: value, open: false });
	};

	menuAction = () => {
		const { handleDrawerClose } = this.props;
		handleDrawerClose();
	};

	render() {
		const { classes, theme } = this.props;
		return (
			<AppContext.Consumer>
				{({ handleDrawerClose }) => (
					<Fragment>
						<div className={classes.toolbar}>
							<Typography variant="subtitle1" gutterBottom>
								Fabricio Nogueira
							</Typography>
							<IconButton onClick={this.menuAction}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
						<Divider />
						<List>
							<ListItem button key="Enviar mensagem" onClick={this.handleClickOpen}>
								<ListItemIcon>
									<MailIcon />
								</ListItemIcon>
								<ListItemText primary="Envie uma mensagem" />
							</ListItem>
							<ListItem button key="Portfólio" component="a" href="https://fabricionogueira.me">
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="Portfólio" />
							</ListItem>
						</List>
						<AppDialog selectedValue={this.state.selectedValue} open={this.state.open} onClose={this.handleClose} />
					</Fragment>
				)}
			</AppContext.Consumer>
		);
	}
}
export default withStyles(styles, { withTheme: true })(Menu);
