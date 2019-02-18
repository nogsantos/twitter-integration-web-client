import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import axios from 'axios';

import { TweetCard, AppInput } from '../../components/index';
import { SuccessHandler, ErrorHandler } from '../message-handlers/index';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2,
		minHeight: 50,
		position: 'relative'
	},
	title: {
		borderBottom: '1px solid #e0e0e0',
		marginBottom: '1rem'
	},
	loader: {
		animationDuration: '550ms',
		position: 'relative',
		left: 0
	}
});

class Tweet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			hashtag: '',
			tweetsList: []
		};
	}

	componentDidMount() {
		this.getValues();
	}

	getValues = () => {
		axios
			.get(`${process.env.REACT_APP_API_ADDRESS}/twitter-local/`)
			.then(tweets => {
				this.setState({
					tweetsList: tweets.data,
					loading: false
				});
			})
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler().catcher(error);
			});
	};

	hashtagChange = event => {
		this.setState({ hashtag: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
	};

	render() {
		const { classes } = this.props;
		const { tweetsList, loading, hashtag } = this.state;
		return (
			<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
				<Grid item xs={12}>
					<Typography variant="h4" className={classes.title}>
						Tweets
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<form noValidate autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
						<AppInput id="btn-tweets-filter" label="Buscar por HashTag" value={hashtag} onChange={this.hashtagChange} />
					</form>
				</Grid>
				{loading ? (
					<Grid item sm={12}>
						<Paper className={classes.root}>
							<CircularProgress
								variant="indeterminate"
								disableShrink
								className={classes.loader}
								size={24}
								thickness={4}
							/>
						</Paper>
					</Grid>
				) : tweetsList.length > 0 ? (
					tweetsList.map(tweet => {
						return (
							<Grid key={tweet.id} item sm={12}>
								<TweetCard
									name={tweet.user.name}
									screenName={tweet.user.screenName}
									text={tweet.text}
									createdAt={tweet.createdAt}
									location={tweet.user.location}
									retweetCount={tweet.retweetCount}
									biggerProfileImageURLHttps={tweet.user.biggerProfileImageURLHttps}
								/>
							</Grid>
						);
					})
				) : (
					<Grid item sm={12}>
						<Paper className={classes.root}>
							<Typography variant="body1" gutterBottom className={classes.empty}>
								Nenhum tweet localizado
							</Typography>
						</Paper>
					</Grid>
				)}
			</Grid>
		);
	}
}
export default withStyles(styles, { withTheme: true })(Tweet);
