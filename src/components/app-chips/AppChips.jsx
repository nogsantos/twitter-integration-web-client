import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	customChip: {
		padding: 5,
		margin: 5
	}
});

class AppChips extends Component {
	render() {
		const { id, text, onDelete, classes } = this.props;
		return <Chip key={id} label={`#${text}`} onDelete={onDelete} className={classes.customChip} />;
	}
}

AppChips.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AppChips);
