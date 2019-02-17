import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

import axios from 'axios';

import { AppChips, AppInput } from '../../components/index';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2,
		minHeight: 50,
		position: 'relative'
	},
	empty: {
		textAlign: 'center',
		width: '100%',
		padding: 15,
		fontStyle: 'italic'
	},
	title: {
		borderBottom: '1px solid #e0e0e0',
		marginBottom: '1rem'
	},
	blueLoader: {
		color: '#6798e5',
		animationDuration: '550ms',
		position: 'relative',
		left: 0
	}
});

class HashTag extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			showMessage: false,
			hashtag: '',
			hashTagList: []
		};
	}

	componentDidMount() {
		this.getValues();
	}

	getValues = () => {
		axios
			.get(`${process.env.REACT_APP_API_ADDRESS}/hashtag/`)
			.then(hashTags => {
				this.setState({
					hashTagList: hashTags.data,
					loading: false
				});
			})
			.catch(err => {
				this.message();
				this.setState({
					hashTagList: [],
					loading: false
				});
			});
	};

	handleDelete = toRemove => () => {
		axios
			.delete(`${process.env.REACT_APP_API_ADDRESS}/hashtag/`, { data: { id: toRemove.id } })
			.then(response => {
				console.log('response');
				this.deleteFromList(toRemove);
				this.message();
			})
			.catch(err => {
				console.log('err');
				this.message();
			});
	};

	deleteFromList = toRemove => {
		this.setState(state => {
			const hashTagList = [...state.hashTagList];
			const chipToDelete = hashTagList.indexOf(toRemove);
			hashTagList.splice(chipToDelete, 1);
			return { hashTagList };
		});
	};

	renderChild = (list, classes) => {
		return list.length > 0 ? (
			list.map(hashTag => {
				return <AppChips key={hashTag.id} id={hashTag.id} text={hashTag.text} onDelete={this.handleDelete(hashTag)} />;
			})
		) : (
			<Typography variant="body1" gutterBottom className={classes.empty}>
				Nenhuma HashTag cadastrada até o momento
			</Typography>
		);
	};

	message = () => {
		this.setState({ showMessage: true });
	};

	hashtagChange = event => {
		this.setState({ hashtag: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.post(`${process.env.REACT_APP_API_ADDRESS}/hashtag/`, { text: this.state.hashtag })
			.then(response => {
				let currentList = this.state.hashTagList;
				currentList.unshift(response.data);
				this.setState({
					hashTagList: currentList
				});
				this.setState({
					hashtag: ''
				});
				this.message();
			})
			.catch(err => {
				console.log(err);
				this.message();
			});
	};

	render() {
		const { classes } = this.props;
		const { hashTagList, loading, showMessage, hashtag } = this.state;
		return (
			<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
				<Grid item xs={12}>
					<Typography variant="h4" className={classes.title}>
						Cadastrar HashTags
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<form noValidate autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
						<AppInput id="btn-cad-hashtag" label="Cadastrar HashTag" value={hashtag} onChange={this.hashtagChange} />
					</form>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.root}>
						{loading ? (
							<CircularProgress
								variant="indeterminate"
								disableShrink
								className={classes.blueLoader}
								size={24}
								thickness={4}
							/>
						) : (
							this.renderChild(hashTagList, classes)
						)}
					</Paper>
				</Grid>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left'
					}}
					open={showMessage}
					autoHideDuration={1000}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">Note archived</span>}
				/>
			</Grid>
		);
	}
}
export default withStyles(styles, { withTheme: true })(HashTag);
