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
	}
});

class AppInput extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<TextField
					className={classNames(classes.margin, classes.textField)}
					id={this.props.id}
					variant="outlined"
					fullWidth
					label={this.props.label}
					value={this.props.value}
					onChange={this.props.onChange}
					InputProps={{
						startAdornment: <InputAdornment position="start">#</InputAdornment>
					}}
				/>
			</div>
		);
	}
}

AppInput.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(AppInput);
