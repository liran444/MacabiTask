// This function is NOT called directly by you
export function reduce(oldAppState, action) {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };
  switch (action.type) {
    case 'Init_Users_Array':
      newAppState.users = (action.payload);
      break;
    case 'Add_User':
      newAppState.users.push(action.payload);
      break;
    default:
      break;
  }

  // After returning the new state, it's being published to all subscribers
  // Each component will render itself based on the new state
  return newAppState;
}
