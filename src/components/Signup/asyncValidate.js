const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => { // simulate server latency
  	fetch('http://localhost:5001/asyncvalidate',{
  		method: 'POST',
  		headers: {'Content-Type': 'application/json'},
	        body: JSON.stringify({
	          email: values.email
	        })	
  	})
  	.then(response => response.json())
  	.then(existed => console.log(existed))
    if (['john', 'paul', 'george', 'ringo'].includes(values.email)) {
    	var error = {username: 'That username is taken'}
    	throw error;
    }
  });
};

export default asyncValidate;
