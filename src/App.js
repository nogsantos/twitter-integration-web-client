import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';

import { AppContext } from './providers/app-context';
import { Bar, Menu } from './components/index';
import { HashTag, Tweet } from './modules/index';

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: {
			main: '#f44336'
		}
	},
	typography: {
		useNextVariants: true
	}
});

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
		margin: 10
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1
		}
	},
	content: {
		marginTop: 75,
		width: '100%'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary
	},
	rightSide: {
		borderLeft: '1px solid #e0e0e0'
	}
});
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { handleDrawerClose, handleDrawerOpen } = this;
		const value = {
			...this.state,
			handleDrawerClose,
			handleDrawerOpen
		};
		const { classes } = this.props;

		return (
			<AppContext.Provider value={value}>
				<MuiThemeProvider theme={theme}>
					<div className={classes.root}>
						<CssBaseline />
						<Bar {...{ handleDrawerOpen }} />
						<Drawer
							variant="permanent"
							className={classNames(classes.drawer, {
								[classes.drawerOpen]: this.state.open,
								[classes.drawerClose]: !this.state.open
							})}
							classes={{
								paper: classNames({
									[classes.drawerOpen]: this.state.open,
									[classes.drawerClose]: !this.state.open
								})
							}}
							open={this.state.open}
						>
							<Menu {...{ handleDrawerClose }} />
						</Drawer>
						<main className={classes.content}>
							<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={24}>
								<Grid item sm={6} xs={12} className={classes.leftSide}>
									<HashTag />
								</Grid>
								<Grid item sm={6} xs={12} className={classes.rightSide}>
									<Tweet />
								</Grid>
							</Grid>
						</main>
					</div>
				</MuiThemeProvider>
			</AppContext.Provider>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
