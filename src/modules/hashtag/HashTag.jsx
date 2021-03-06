import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

import { AppChips, AppInput } from '../../components/index';
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
	loader: {
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
			.catch(error => {
				this.setState({ loading: false });
				new ErrorHandler(error).catcher();
			});
	};

	handleDelete = toRemove => () => {
		axios
			.delete(`${process.env.REACT_APP_API_ADDRESS}/hashtag/`, { data: { id: toRemove.id } })
			.then(response => {
				this.deleteFromList(toRemove);
				new SuccessHandler(`HashTag: #${toRemove.text} Removida com sucesso.`).dispatcher();
			})
			.catch(error => {
				new ErrorHandler(error).catcher();
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

	hashtagChange = event => {
		this.setState({ hashtag: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.post(`${process.env.REACT_APP_API_ADDRESS}/hashtag/`, { text: this.state.hashtag })
			.then(response => {
				new SuccessHandler(`HashTag: #${this.state.hashtag} Criada com sucesso.`).dispatcher().publishToLoad();

				let currentList = this.state.hashTagList;
				currentList.unshift(response.data);
				this.setState({
					hashTagList: currentList,
					hashtag: ''
				});
			})
			.catch(error => {
				new ErrorHandler(error).catcher();
			});
	};

	render() {
		const { classes } = this.props;
		const { hashTagList, loading, hashtag } = this.state;
		return (
			<Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={8}>
				<Grid item xs={12}>
					<Typography variant="h4" className={classes.title}>
						HashTags
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<form noValidate autoComplete="off" className={classes.form} onSubmit={this.handleSubmit}>
						<AppInput id="btn-cad-hashtag" label="Cadastrar" value={hashtag} onChange={this.hashtagChange} />
					</form>
				</Grid>
				<Grid item xs={12}>
					<Paper className={classes.root}>
						{loading ? (
							<CircularProgress
								variant="indeterminate"
								disableShrink
								className={classes.loader}
								size={24}
								thickness={4}
							/>
						) : hashTagList.length > 0 ? (
							hashTagList.map(hashTag => {
								return (
									<AppChips
										key={hashTag.id}
										id={hashTag.id}
										text={hashTag.text}
										onDelete={this.handleDelete(hashTag)}
									/>
								);
							})
						) : (
							<Typography variant="body1" gutterBottom className={classes.empty}>
								Nenhuma HashTag cadastrada
							</Typography>
						)}
					</Paper>
				</Grid>
			</Grid>
		);
	}
}
export default withStyles(styles, { withTheme: true })(HashTag);
