import React from 'react';
import { ScreenResourceContext } from '../App';
import { useNavigationState, useRoute } from '@react-navigation/native';

export const useScreenResource = () => {
  const {state} = React.useContext(ScreenResourceContext);
  const {key} = useRoute();
  console.log(state, key);

  return state[key] ? state[key] : null;
}
