import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HomeTabStack } from './navigation/homeTabStack';
import { SearchTabStack } from './navigation/searchTabStack';


type ScreenResourceAction = {type: 'add', key: string, message: string} | {type: 'remove', key: string};
type ScreenResource = {[key: string]: {message: string}};
const screenResourceReducer: React.Reducer<{[key: string]: {message: string}}, ScreenResourceAction> = (state, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        [action.key]: {message: action.message}
      }
    case 'remove':
      const {[action.key]: {}, ...rest} = state;
      return rest;
  }
}

export const ScreenResourceContext = React.createContext<{state: ScreenResource, dispatch: React.Dispatch<ScreenResourceAction> | null}>({state: {}, dispatch: null});
const MainTabNavigator = createBottomTabNavigator();
const App = () => {

  const [state, dispatch] = React.useReducer(screenResourceReducer, {});

  return (
      <ScreenResourceContext.Provider value={{state, dispatch}}>
        <NavigationContainer>
          <MainTabNavigator.Navigator>
            <MainTabNavigator.Screen name='Home' component={HomeTabStack} />
            <MainTabNavigator.Screen name='Search' component={SearchTabStack} />
          </MainTabNavigator.Navigator>
        </NavigationContainer>
      </ScreenResourceContext.Provider>
  );
};
export default App;
