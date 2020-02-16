import React from 'react';
import {
  NavigationProp,
  StackActions,
  RouteProp,
  useNavigationState,
} from '@react-navigation/native';
import {View, Button, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { ScreenResourceContext } from '../../App';
import { useScreenResource } from '../../hooks/screenResource';

const MainTimelineScreen: React.FC<{
  navigation: NavigationProp<HomeTabNavigationParamList, 'mainTimeline'>;
}> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>main timeline</Text>
      <Button
        title="go to profile"
        onPress={() =>
          navigation.dispatch(
            StackActions.push('profileTimeline', {memberId: 'hoge'}),
          )
        }
      />
    </View>
  );
};

const ProfileTimelineScreen: React.FC<{
  route: RouteProp<HomeTabNavigationParamList, 'profileTimeline'>;
  navigation: NavigationProp<HomeTabNavigationParamList, 'profileTimeline'>;
}> = ({route, navigation}) => {
  const index = useNavigationState(state => state.index);
  const {dispatch, state} = React.useContext(ScreenResourceContext);
  const screenResource = useScreenResource();
  React.useEffect(() => {
    console.log('mounted', route.key);
    dispatch({type: 'add', key: route.key, message: String(new Date().getTime())});
    console.log(state);

    return () => {
      console.log('unmounted', route.key);
      dispatch({type: 'remove', key: route.key});
    };
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>profile timeline</Text>
      <Text>memberId: {route.params.memberId}</Text>
      <Text>index: {index}</Text>
      <Text>{screenResource?.message ?? 'not found'}</Text>
      <Button
        title="go to profile"
        onPress={() =>
          navigation.dispatch(
            StackActions.push('profileTimeline', {memberId: 'fuga'}),
          )
        }
      />
    </View>
  );
};

type HomeTabNavigationParamList = {
  mainTimeline: undefined;
  profileTimeline: {memberId: string};
};
const HomeTabStackNavigator = createStackNavigator();
export const HomeTabStack = () => {
  return (
    <HomeTabStackNavigator.Navigator initialRouteName="mainTimeline">
      <HomeTabStackNavigator.Screen
        name="mainTimeline"
        component={MainTimelineScreen}
      />
      <HomeTabStackNavigator.Screen
        name="profileTimeline"
        component={ProfileTimelineScreen}
      />
    </HomeTabStackNavigator.Navigator>
  );
};
