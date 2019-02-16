import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2
	},
	chip: {
		margin: theme.spacing.unit / 2
	}
});

class HashTags extends Component {
	state = {
		chipData: [
			{ key: 0, label: '#Angular' },
			{ key: 1, label: '#jQuery' },
			{ key: 2, label: '#Polymer' },
			{ key: 3, label: '#React' },
			{ key: 4, label: '#Vue.js' }
		]
	};

	handleDelete = data => () => {
		this.setState(state => {
			const chipData = [...state.chipData];
			const chipToDelete = chipData.indexOf(data);
			chipData.splice(chipToDelete, 1);
			return { chipData };
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root}>
				{this.state.chipData.map(data => {
					let icon = null;
					return (
						<Chip
							key={data.key}
							icon={icon}
							label={data.label}
							onDelete={this.handleDelete(data)}
							className={classes.chip}
						/>
					);
				})}
			</Paper>
		);
	}
}

HashTags.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HashTags);