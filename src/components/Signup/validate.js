const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  // } else if(values.password !== values.pwConfirm){
  //   errors.pwConfirm = 'Password does not match'
  // }
  // for future development

  if(!values.pwConfirm){
    errors.pwConfirm = 'Required'
  }
  return errors
}

export default validate