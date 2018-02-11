const defaultState = {
  firstname: "",
  lastname: "",
  username: "",
  isLoggedIn: false  
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, {
        isLoggedIn: true,
        firstname: action.firstname,
        lastname: action.lastname,
        username: action.username
      });
    case "LOGOUT":
      return Object.assign({}, state, {
        isLoggedIn: false,
        firstname: "",
        lastname: "",
        username: ""
      });
    default:
      return state;
  }
}
