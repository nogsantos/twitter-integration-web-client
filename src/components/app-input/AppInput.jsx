import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		marginBottom: 8
	},
	textField: {
		flexBasis: '100%'
	},
	form: {
		width: '100%'
	}
});

class AppInput extends Component {
	state = {
		hashtag: ''
	};

	handleChange = prop => event => {
		this.setState({ [prop]: event.target.value });
	};

	handleSubmit = event => {
		alert('A name was submitted: ' + this.state.hashtag);
		event.preventDefault();
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<form noValidate autoComplete="off" className={classes.form}  onSubmit={this.handleSubmit}>
					<TextField
						className={classNames(classes.margin, classes.textField)}
						id={this.props.id}
						variant="outlined"
						fullWidth
						label={this.props.label}
						value={this.state.hashtag}
						onChange={this.handleChange('hashtag')}
						InputProps={{
							startAdornment: <InputAdornment position="start">#</InputAdornment>
						}}
					/>
				</form>
			</div>
		);
	}
}

AppInput.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
};

export default withStyles(styles)(AppInput);
