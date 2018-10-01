import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';


const Navigation = withRouter(({ isAuthenticated, onSignout, location }) => {
	
		if(isAuthenticated){
			return(
				<nav className='flex justify-end'>
					<p  className='f3 pa3 bg-light-gray'>Signed in</p>
					<p onClick ={onSignout} className='f3 pa3 dim pointer link'>Sign out</p>

				</nav>
			)
			
		} else {
			return(
					<nav className='flex justify-end'>
						<NavLink to='/signin' exact 
						className='f3 pa3 dim pointer link black nofocusbox'>Sign in</NavLink>
						<NavLink to='/choosecoin' exact 
						className='f3 pa3 dim pointer link black nofocusbox'>Sign up</NavLink>
					</nav>
			
			)

		}

})

export default Navigation;