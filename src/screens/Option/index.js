import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import Header from '../../components/Header';
import {coinTypeLists, timeLists} from '../../utils';
import {setCoinOption} from '../../store/action';
import _ from 'lodash';
import {Chip} from 'react-native-paper';
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icons from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {TextInput} from 'react-native-paper';

function Option(props) {
  const [values, setValues] = useState({
    period: 3,
    cryptoKind: [],
    mas: {},
    maKind: [],
    maBTC: [],
    maLTC: [],
    maETH: [],
    maETC: [],
    maEOS: [],
    maXRP: [],
    maBCH: [],
    percent: '99.95',
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setValues(props.coinData);
  }, [props.coinData]);

  React.useEffect(() => {}, []);

  const maValidate = () => {
    let index = 0;
    Object.keys(values.mas).map((item) => {
      if (values.mas[item] === '') {
        index++;
      }
    });
    if (index === 5) {
      return false;
    } else {
      return true;
    }
  };

  const coinValidate = () => {
    if (values.cryptoKind.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const goHome = () => {
    if (maValidate() && coinValidate()) {
      props.navigation.navigate('Home');
    } else {
      if (!maValidate()) {
        alert('Please Select MA');
        return;
      }
      if (!coinValidate()) {
        alert('Please Select Coin Type');
        return;
      }
    }
  };

  const setPercent = (text) => {
    setCoinOption(dispatch,{...values, percent:text});
  };


  return (
    <>
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                {/* <Thumbnail square source={{uri: 'Image URL'}} /> */}
                <Icon name="ios-timer" size={30} color="#900" />
              </Left>
              <Body>
                <Text>Time</Text>
                <Chip
                  icon="timer"
                  onPress={() => props.navigation.navigate('TimeOption')}
                  style={{width: '40%'}}>
                  {_.find(timeLists, ['value', values.period]).label}
                </Chip>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => props.navigation.navigate('TimeOption')}>
                  <Text>SETTING</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <Icons name="linechart" size={30} color="#900" />
              </Left>
              <Body>
                <Text>Moving Average</Text>
                {Object.keys(values.mas).map((item, index) => {
                  if (values.mas[item] !== '') {
                    return (
                      <Chip
                        key={index}
                        icon="chart-line"
                        mode="outlined"
                        onPress={() => props.navigation.navigate('MAOption')}
                        style={{width: '45%', marginVertical: 5}}>
                        {`MA(${values.mas[item]})`}
                      </Chip>
                    );
                  }
                })}
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => props.navigation.navigate('MAOption')}>
                  <Text>SETTING</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <FontAwesome5Icon name="coins" size={30} color="#900" />
              </Left>
              <Body>
                <Text>Coin type</Text>
                {values.cryptoKind.map((item) => {
                  return (
                    <Chip
                      icon="coin"
                      key={item.id}
                      mode="outlined"
                      onPress={() =>
                        props.navigation.navigate('CoinTypeOption')
                      }
                      style={{width: '45%', marginVertical: 5}}>
                      {item}
                    </Chip>
                  );
                })}
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => props.navigation.navigate('CoinTypeOption')}>
                  <Text>SETTING</Text>
                </Button>
              </Right>
            </ListItem>
            <ListItem thumbnail>
              <Left>
                <FontAwesome5Icon name="percent" size={30} color="#900" />
              </Left>
              <Body>
                <Text>Percent</Text>
                <TextInput
                  mode="outlined"
                  style={{height: 30, width:'50%'}}
                  // label='MA value'
                  value={values.percent}
                  onChangeText={(text) => {
                    setPercent(text);
                  }}
                />
              </Body>
            </ListItem>
          </List>
          <Button
            rounded
            success
            block
            style={{marginHorizontal: 100, marginVertical: 30}}
            onPress={goHome}>
            <Text>NEXT</Text>
            <FontAwesome5Icon name="arrow-right" color="#fff" />
          </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Option);
