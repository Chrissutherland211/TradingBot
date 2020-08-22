import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {timeLists} from '../../utils';
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

function TimeOption(props) {
  const [values, setValues] = useState(props.coinData);
  const dispatch = useDispatch();

  const _onToggleSwitch = (value) => {
    setValues({...values, period: value});
    setCoinOption(dispatch, {period: value});
  };

  return (
    <>
      <Container>
        <Header style={{backgroundColor: 'white'}}>
          <Left>
            <Button transparent onPress={() => props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: 'black'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: 'black'}}>Time Setting</Title>
          </Body>
        </Header>
        <Content>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {timeLists.map((item) => {
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
                    style={
                      item.value === values.period
                        ? {color: 'green'}
                        : {color: 'black'}
                    }>
                    {item.label}
                  </Text>
                  <Switch
                    value={item.value === values.period ? true : false}
                    onValueChange={() => _onToggleSwitch(item.value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeOption);
