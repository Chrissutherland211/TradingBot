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
  Title,
  View,
  Text,
  Icon,
} from 'native-base';
import {Checkbox, TextInput} from 'react-native-paper';
import Icons from 'react-native-vector-icons/AntDesign';

function MAOption(props) {
  const [values, setValues] = useState(props.coinData);
  const MAs = values.mas;

  const dispatch = useDispatch();

  const setMaValue = (id, text) => {
    setValues({...values, mas: {...values.mas, [id]: text}});
  };

  const onGoBack = () => {
    setCoinOption(dispatch, {mas: values.mas});
    props.navigation.goBack();
  };

  useEffect(() => {}, []);

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
            <Title style={{color: 'black'}}>Moving Average Setting</Title>
          </Body>
        </Header>
        <Content>
          {_.sortBy(Object.keys(values.mas)).map((item, i) => {
            return (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <View>
                    <Checkbox.Item
                      status={MAs[item] !== '' ? 'checked' : 'unchecked'}
                      onPress={() =>
                        setValues({...values, mas: {...values.mas, [item]: ''}})
                      }
                    />
                  </View>
                  <Text>{item}</Text>
                  <Icons
                    name="minuscircleo"
                    size={20}
                    onPress={() =>
                      setValues({...values, mas: {...values.mas, [item]: ''}})
                    }
                  />
                  <View style={{width: 50}}>
                    {MAs[item] !== '' ? (
                      <TextInput
                        mode="outlined"
                        style={{height: 30}}
                        // label='MA value'
                        value={MAs[item]}
                        onChangeText={(text) => {
                          setMaValue(item, text);
                        }}
                      />
                    ) : (
                      <Text>{MAs[item]}</Text>
                    )}
                  </View>
                  <Icons
                    name="pluscircleo"
                    size={20}
                    onPress={() =>
                      setValues({...values, mas: {...values.mas, [item]: null}})
                    }
                  />
                </View>
              </View>
            );
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(MAOption);
