import React from 'react'

const Send = ({ transactionState }) =>{
	const { from, payInAddress, amountToPayIn} = transactionState

	return(
		<div>
			<p>{`Send ${amountToPayIn} ${from} to ${payInAddress} `}</p>
		</div>
	);
}

export default Send;