import React from 'react'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames';
import { styles } from '../../modules/modules'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


class OrderedCoins extends React.Component{
	render(){
		const {classes, displayCoin } = this.props
		return (
				<Paper className={classNames(classes.orderedCoins, classes.center, classes.textField)} elevation={0}>
					<Grid container spacing={16} className={classNames(classes.containerFlex)}>
						<Grid className={classNames(classes.center)} 
						item xs={12} sm={6}>
							<Grid container justify='center' spacing={8} className={classNames(classes.typographyButton)}>
								<Grid item>
									<Typography>
										Masternode
									</Typography>
								</Grid>
								<Grid item>
									<Typography>
										{displayCoin}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid className={classNames(classes.center)} 
						item xs={12} sm={6}>
							<Grid container justify='center' spacing={8} className={classNames(classes.typographyButton)}>
								<Grid item >
									<Typography>
										Quantity
									</Typography>
								</Grid>
								<Grid item>
									<Typography>
										1
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			)

	}
}

export default withStyles(styles)(OrderedCoins)