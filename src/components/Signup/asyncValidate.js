

const asyncValidate = async (values /*, dispatch */) => {

 	//check if email is taken
  	await fetch('http://localhost:5001/asyncvalidate',{
  		method: 'POST',
  		headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          email: values.email
	        })	
  	})
  	.then(response => response.json())
  	.then(data => {
  		if(data.taken){
  			var error = {email: 'Email is taken'}
    		throw error;
  		}
  	})

};

export default asyncValidate;
