import featherService from '../../services/feathers';

export const login = (username, password) => {
  const user = featherService.login(username, password);

  return {
    type: "LOGIN",
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.email
  };
};

export const logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const signup = (firstname, lastname, username, password) => {
  const user = featherService.createAccount(firstname, lastname, username, password);

  return {
    type: "LOGIN",
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.email
  };
};
