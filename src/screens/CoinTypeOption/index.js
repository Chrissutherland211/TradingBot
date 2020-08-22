import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {coinTypeLists} from '../../utils';
import {setCoinOption} from '../../store/action';
import _ from 'lodash';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  View,
  Text,
} from 'native-base';
import {Switch} from 'react-native-paper';

function CoinTypeOption(props) {
  const [values, setValues] = useState(props.coinData);
  const dispatch = useDispatch();

  const _onToggleSwitch = (value) => {
    if (values.cryptoKind.includes(value)) {
      var data = _.remove(values.cryptoKind, function (item) {
        return item !== value;
      });
      console.log(data);
      setValues({...values, cryptoKind: data});
    } else {
      let temp = values.cryptoKind;
      temp.push(value);
      console.log(temp);
      setValues({...values, cryptoKind: temp});
    }
  };

  const onGoBack = () => {
    setCoinOption(dispatch, {cryptoKind: values.cryptoKind});
    props.navigation.goBack();
  };

  return (
    <>
      <Container>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Button transparent onPress={onGoBack}>
              <Icon name="arrow-back" style={{color: 'black'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black'}}>Coin Type Setting</Title>
          </Body>
        </Header>
        <Content>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {coinTypeLists.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '50%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <Text
                  // style={
                  //   item.value === values.period
                  //     ? {color: 'green'}
                  //     : {color: 'black'}
                  // }
                  >
                    {item}
                  </Text>
                  <Switch
                    value={values.cryptoKind.includes(item) ? true : false}
                    onValueChange={() => _onToggleSwitch(item)}
                  />
                </View>
              );
            })}
          </View>
        </Content>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  coinData: state,
});

//Map your action creators to your props.
const mapDispatchToProps = {
  setCoinOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinTypeOption);
