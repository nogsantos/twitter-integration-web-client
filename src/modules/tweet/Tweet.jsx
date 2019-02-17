import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import PubSub from 'pubsub-js';

import { UserCard, AppInput } from '../../components/index';

const styles = theme => ({
	title: {
		borderBottom: '1px solid #e0e0e0',
		marginBottom: '1rem'
	}
});

class Tweet extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			hashtag: '',
			TweetsList: []
		};
	}

	componentDidMount() {
		PubSub.subscribe('update-tweets-with-new-hashtag', (topic, message) => {
			console.log('message-twitter', message);
		});
	}

	hashtagChange = event => {
		this.setState({ hashtag: event.target.value });
	};

	render() {
		const { classes } = this.props;
		const { hashtag } = this.state;
		return (
			<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
				<Grid item xs={12}>
					<Typography variant="h4" className={classes.title}>
						Buscar Tweets
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<AppInput
						id="btn-tweets-filter"
						label="Filtrar tweets por HashTag"
						value={hashtag}
						onChange={this.hashtagChange}
					/>
				</Grid>
				{[0, 1].map(data => {
					return (
						<Grid key={data} item sm={12}>
							<UserCard
								name="Philip Gipson"
								screenName="childgolden"
								text="RT @LastLifeSeries: #BloodBorn badasses 😈🔮 #LastLife #LLSE2 #slaylor #webseries #pumasquad #witches https://t.co/dnWUMISHI"
								createdAt="2019-02-14T04:35:58.000+0000"
								location="Dayton, Ohio"
								retweetCount={10}
								biggerProfileImageURLHttps="https://pbs.twimg.com/profile_images/1064782299236048901/PHO3M3OY_bigger.jpg"
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}
}
export default withStyles(styles, { withTheme: true })(Tweet);
