import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

const SearchScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Search</Text>
    </View>
  );
};

const SearchStackNavigator = createStackNavigator();
export const SearchTabStack = () => {
  return (
    <SearchStackNavigator.Navigator>
      <SearchStackNavigator.Screen name="search" component={SearchScreen} />
    </SearchStackNavigator.Navigator>
  );
};
