import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { AppContext } from './providers/app-context';
import { Bar, Menu, HashTags, AppInput } from './components/index';

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
		marginTop: 75
	},
	paper: {
		padding: theme.spacing.unit * 2,
		color: theme.palette.text.secondary
	}
});
class App extends Component {
	state = {
		open: false
	};

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
							<Grid container spacing={24}>
								<Grid item sm={6} xs={12}>
									<AppInput id="btn-cad-hashtag" label="Busque a hashtag" />
									<HashTags />
								</Grid>
								<Grid item sm={6} xs={12}>
									<Paper className={classes.paper}>
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae qui perferendis voluptas. A ratione
										ad ullam qui architecto facilis culpa nostrum. Cumque optio inventore soluta iure recusandae.
										Consequuntur, aut dolores. Est veniam, illo vitae a temporibus saepe ullam! Maxime maiores totam
										iste, rem odio eaque corporis illo. Mollitia, est in! Ullam nesciunt rerum dolore cumque, ipsam
										corporis minima hic voluptate. Quam voluptatem unde repellendus sapiente, consequatur doloremque
										ipsa ex rerum officia suscipit quod sunt maiores vel veritatis earum libero! Eius laudantium
										reiciendis exercitationem eligendi, mollitia eveniet quia inventore expedita. Labore? Quisquam
										repellendus omnis tempora nemo, rerum temporibus. Nesciunt excepturi saepe odio impedit fuga placeat
										tempora soluta facere corporis odit accusantium sint, voluptatem pariatur inventore laudantium sit.
										Cum recusandae eos temporibus? Odit ratione, laudantium architecto esse tenetur maiores fugit
										cupiditate commodi, eos omnis similique facilis? Molestiae eaque doloremque id quibusdam pariatur
										similique voluptas veniam, tempore culpa vero, velit placeat est alias? Totam at voluptatibus fugiat
										perspiciatis quia repellat, nemo ab, minus unde ratione id recusandae veritatis? Beatae ea quis
										dolorum amet earum nam, fugiat necessitatibus iure labore quasi possimus nisi in. Vel, totam! Error
										eos voluptate pariatur quia unde quae dolorem suscipit consequuntur cum necessitatibus, a maiores
										deleniti temporibus saepe porro ab reprehenderit eligendi eius, accusantium enim sequi deserunt
										ullam iusto? Aliquam corrupti culpa, totam facilis voluptatem blanditiis dignissimos laboriosam
										repellat voluptas dolores, ad cumque, quod pariatur. Earum voluptatibus facilis, cumque animi qui
										aliquam deserunt voluptas impedit id, molestias sit iusto! Molestiae voluptatem sequi quasi
										corrupti. Consequatur dolores laudantium rem asperiores qui? Mollitia asperiores aspernatur eveniet
										ratione hic beatae quod vero officiis nihil! Atque velit distinctio voluptatum, repellendus quo id
										quisquam? Veritatis, atque ipsa! Aspernatur obcaecati velit ipsam neque autem ut, quod, molestiae
										aut nam ratione repellendus iusto cumque? Sed neque recusandae vel autem commodi quas eum ipsum?
										Error, itaque voluptatibus?
									</Paper>
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
