/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {executeCalculator} from './NativeCalculatorUtils';

type TypeCalcAction =
  | 'plus'
  | 'minus'
  | 'multiply'
  | 'divide'
  | 'clear'
  | 'equal';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const screenSize = useWindowDimensions();
  const buttonSize = screenSize.width / 4;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [resultNumber, setResultNumber] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const [tempNumber, setTempNumber] = useState(0);
  const [lastAction, setLastAction] = useState<Exclude<
    TypeCalcAction,
    'equal' | 'clear'
  > | null>(null);

  const onPressNumber = useCallback<(pressed: number) => void>(
    pressed => {
      console.log(pressed);

      if (resultNumber) {
        setResultNumber('');
      }

      setInputNumber(prev => {
        const nextNum = parseInt(`${prev}${pressed}`);

        return nextNum.toString();
      });
    },
    [resultNumber],
  );

  const onPressAction = useCallback<(action: TypeCalcAction) => Promise<void>>(
    async pressed => {
      if (pressed === 'clear') {
        setInputNumber('');
        setTempNumber(0);
        setResultNumber('');
        return;
      }

      if (pressed === 'equal') {
        if (tempNumber && lastAction) {
          const result = await executeCalculator(
            lastAction,
            tempNumber,
            parseInt(inputNumber),
          );

          console.log(result);
          setResultNumber(result.toString());
          setTempNumber(0);
        }
        return;
      }
      setLastAction(pressed);

      if (resultNumber) {
        setTempNumber(parseInt(resultNumber));
        setResultNumber('');
        setInputNumber('');
      } else if (!tempNumber) {
        setTempNumber(parseInt(inputNumber));
        setInputNumber('');
      } else {
        const result = await await executeCalculator(
          pressed,
          tempNumber,
          parseInt(inputNumber),
        );

        console.log(result);
        setResultNumber(result.toString());
        setTempNumber(0);
      }
    },
    [inputNumber, lastAction, resultNumber, tempNumber],
  );

  return (
    <SafeAreaView
      style={{flex: 1, marginBottom: Platform.OS === 'android' ? 150 : 0}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        <View
          style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
          <Text style={{fontSize: 48, padding: 48}}>
            {resultNumber ? resultNumber : inputNumber}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 4,
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(number => (
              <Pressable
                onPress={() => onPressNumber(number)}
                style={{
                  width: buttonSize - 4,
                  height: buttonSize - 4,
                  borderRadius: (buttonSize - 4) * 0.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                }}>
                <Text style={{fontSize: 24}}>{number}</Text>
              </Pressable>
            ))}
          </View>
          <View style={{paddingHorizontal: 12}}>
            {[
              {label: '+', action: 'plus'},
              {label: '-', action: 'minus'},
              {label: '*', action: 'multiply'},
              {label: '/', action: 'divide'},
              {label: 'C', action: 'clear'},
              {label: '=', action: 'equal'},
            ].map(action => {
              return (
                <Pressable
                  onPress={() => onPressAction(action.action as TypeCalcAction)}
                  style={{
                    width: screenSize.width / 6,
                    height: screenSize.width / 6,
                    borderRadius: (screenSize.width / 6) * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'lightgray',
                  }}>
                  <Text style={{fontSize: 24}}>{action.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default App;
