const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(() => { // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
    	var error = {username: 'That username is taken'}
    	throw error;
    }
  });
};

export default asyncValidate;
