import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

import { AppContext } from '../../providers/app-context';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	}
});

class Bar extends Component {

	barAction = () => {
		const { handleDrawerOpen } = this.props;
		handleDrawerOpen();
	};

	render() {
		const { classes } = this.props;
		return (
			<AppContext.Consumer>
				{({ handleDrawerOpen, open }) => (
					<Fragment>
						<div className={classes.root}>
							<AppBar
								position="fixed"
								className={classNames(classes.appBar, {
									[classes.appBarShift]: open
								})}
							>
								<Toolbar disableGutters={!open}>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={this.barAction}
										className={classNames(classes.menuButton, {
											[classes.hide]: open
										})}
									>
										<MenuIcon />
									</IconButton>
									<Typography variant="h6" color="inherit" noWrap>
										Twitter Web Client
									</Typography>
								</Toolbar>
							</AppBar>
						</div>
					</Fragment>
				)}
			</AppContext.Consumer>
		);
	}
}
export default withStyles(styles, { withTheme: true })(Bar);
