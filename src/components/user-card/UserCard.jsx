import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import TrendingUp from '@material-ui/icons/Whatshot';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	card: {
		display: 'flex'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto'
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
		top: '0.5rem',
		boxShadow: '0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.02)'
	},
	link: {
		marginRight: theme.spacing.unit
	},
	screenName: {
		color: '#767676',
		fontSize: '0.9rem'
	},
	badge: {
		right: -3,
		border: `2px solid ${theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]}`
	},
	trend: {
		position: 'relative',
		float: 'right',
		right: '10px'
	}
});

class UserCard extends Component {
	formatDate = date => {
		let formatedDate = new Date(Date.parse(date));
		let d = d => (d < 10 ? `0${d}` : d);
		return `${d(formatedDate.getDate())}/${d(formatedDate.getMonth() + 1)}/${formatedDate.getFullYear()} às ${d(
			formatedDate.getUTCHours()
		)}h${formatedDate.getMinutes()}m`;
	};

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<Avatar alt={this.props.name} src={this.props.biggerProfileImageURLHttps} className={classes.bigAvatar} />
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={24}>
							<Grid item xs={12}>
								<Typography variant="h6">
									<Link href={`https://twitter.com/${this.props.screenName}`} className={classes.link} target="_blanck">
										{this.props.name}
									</Link>
									<span className={classes.screenName}>@{this.props.screenName}</span>
									{this.props.retweetCount > 0 ? (
										<Tooltip title="Reetweets" placement="left-start">
											<Badge
												className={classes.trend}
												badgeContent={this.props.retweetCount}
												max={999}
												color="primary"
												classes={{ badge: classes.badge }}
											>
												<TrendingUp />
											</Badge>
										</Tooltip>
									) : (
										''
									)}
								</Typography>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom>
								{this.props.text}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="caption" gutterBottom>
								Local: {this.props.location} em {this.formatDate(this.props.createdAt)}
							</Typography>
						</Grid>
					</CardContent>
				</div>
			</Card>
		);
	}
}

UserCard.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	screenName: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	biggerProfileImageURLHttps: PropTypes.string.isRequired,
	retweetCount: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(UserCard);
