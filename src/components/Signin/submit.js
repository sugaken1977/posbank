// import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(1000).then(() => {
    // console.log(values)
    // simulate server latency
    const {email, name, password, gender, birthday, zipcode, state, city,
      line1, line2 } = values

    fetch('http://localhost:5001/signup',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
             email: email,
             name: name,
             password: password,
             gender: gender,
             birthday: birthday,
             zipcode: zipcode,
             state: state,
             city: city,
             line1: line1,
             line2: line2
          })
        })
      .then(response => response.json())
      .then(user => console.log(user))
      .catch(err => err)
    // if (!['nguyenvietvu@live.com'].includes(values.email)) {
    //   throw new SubmissionError({
    //     username: 'User does not exist',
    //     _error: 'Login failed!'
    //   })
    // } else if (values.password !== '123') {
    //   throw new SubmissionError({
    //     password: 'Wrong password',
    //     _error: 'Login failed!'
    //   })
    // } else {
    //   window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    // }
  })
}

export default submit