import React from 'react'
import { Redirect, NavLink } from 'react-router-dom'
import {Decimal} from 'decimal.js'

Decimal.config({ precision: 2, rounding: 4 });

const Coins = props => {
	
  const { onNext, onSelectCoin, onselectNodeQuantity, selectedCoin, nodeQuantity } = props

  var coins =[
  	{	
  		coinId: 1,
  		name: 'Horizen',
  		required: 42,
  		minedPerMonth: 216000,
  		poolReward: 0.1,
  		price: 16.01,
  		node: 10360,
  		serviceFee: 8.95
  	},
  	{	
  		coinId: 2,
  		name: 'Dash',
  		required: 1000,
  		ROI: 0.0687
  	},
  	{	
  		coinId: 3,
  		name: 'PIVX',
  		required: 10000,
  		ROI: 0.1004
  	},
  	{	
  		coinId: 4,
  		name: 'Zcoin',
  		required: 10000,
  		ROI: 0.2030
  	}
  ]


  return (
      <div>
      	<div>
      		<label>Number of node</label>
      		<input type='text' onChange = {onselectNodeQuantity}/>
      	</div>
		<ul className='flex flex-column pa1'>	
			{
				coins.map(coin => {
					var mRewardCrypt = coin.minedPerMonth*coin.poolReward/coin.node,
						 mRewardUSD = mRewardCrypt* coin.price,
						 mProfitUSD = (mRewardUSD - coin.serviceFee)*nodeQuantity,
						 mProfitCrypt =  mProfitUSD/coin.price,
						 aProfitUSD =  mProfitUSD*12,
						 aProfitCrypt = aProfitUSD/coin.price,
						 roi =new Decimal(aProfitCrypt/(nodeQuantity*coin.required))*100,
						 roundedRoi= roi.toFixed(2);


					return <li className='flex flex-row mv2 pa2 bg-light-gray shadow-1 list'  key={coin.coinId} >
								<button className='f6 link dim ph3 pv2 mb2 dib white bg-light-purple '><NavLink
									to='/signup'
									className="no-underline white" 
									onClick = { () => onSelectCoin(coin.name)}
									title="Learn More">
									Get
									</NavLink>
								</button>
								<span className='mv1 mh1'>{coin.name}</span>
								<span className='mv1 mh1'>{`# Required: ${coin.required}`}</span>
								<span className='mv1 mh1'>Extra # Required: 0.05</span>
								<span className='mv1 mh1'>{`Node fee: ${nodeQuantity*coin.required} ${coin.name}`} </span>
								<span className='mv1 mh1'>{`ROI: ${roundedRoi} %`} </span>
								<span className='mv1 mh1'>{`POSBank fee: ${coin.serviceFee}`}</span>								
								
							</li>
				})
				
			}
						
		</ul>

				
	</div>
 )
}

export default Coins;