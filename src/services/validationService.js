const validateUser = (username, password, confirmPassword) => {
  const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  );

  let response = {};

  if (!username) {
    response.usernameError = 'Username field cannot be empty';
  } else if (username.length > 50) {
    response.usernameError = 'Username cannot be more then 50 chars';
  } else {
    response.usernameError = '';
  }

  if (!passwordRegex.test(password)) {
    response.passwordError =
      'Password must be 8+ digets, have a number, 1 upper- and lowercase char';
  } else {
    response.passwordError = '';
  }

  if (confirmPassword) {
    if (confirmPassword !== password) {
      response.confirmPasswordError =
        'Confirm Password must be the same as password';
    } else {
      response.confirmPasswordError = '';
    }
  }

  return response;
};

const validateTrack = (name, artist, length) => {
  let response = {};

  const array = [name, artist];
  array.forEach((element, index) => {
    const prefix = index === 0 ? 'Name' : 'Artist';
    if (!element) {
      response[prefix + 'Error'] = prefix + ' field cannot be empty';
    } else if (element.length > 50) {
      response[prefix + 'Error'] = prefix + ' cannot be more then 50 chars';
    } else {
      response[prefix + 'Error'] = '';
    }
  });

  if (!length || length === 0) {
    response.lengthError = 'Length field cannot be empty or 0';
  } else if (length > 60) {
    response.lengthError = 'Length cannot be more then 1 hour';
  } else {
    response.lengthError = '';
  }

  return response;
};

export { validateTrack, validateUser };
