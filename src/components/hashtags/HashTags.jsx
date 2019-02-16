import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		padding: theme.spacing.unit / 2,
		minHeight: 50
	},
	chip: {
		margin: theme.spacing.unit / 2
	},
	empty: {
		textAlign: 'center',
		padding: 15,
		fontStyle: 'italic'
	}
});

class HashTags extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.hashTags !== prevProps.hashTags) {
			this.setState({ data: this.props.hashTags });
		}
	}

	handleDelete = toRemove => () => {
		this.setState(state => {
			const data = [...state.data];
			const chipToDelete = data.indexOf(toRemove);
			data.splice(chipToDelete, 1);
			return { data };
		});
	};

	render() {
		const { classes } = this.props;
		const data = this.state.data;
		return (
			<Paper className={classes.root}>
				{data.length > 0 ? (
					data.map(hashTag => (
						<Chip
							key={hashTag.id}
							label={`#${hashTag.text}`}
							onDelete={this.handleDelete(hashTag)}
							className={classes.chip}
						/>
					))
				) : (
					<Typography variant="body1" gutterBottom className={classes.empty}>
						Nenhuma HashTag cadastrada até o momento
					</Typography>
				)}
			</Paper>
		);
	}
}

HashTags.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HashTags);
