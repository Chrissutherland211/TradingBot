import React, {Component} from 'react';
import {
  Container,
  Header,
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
export default class ListThumbnailExample extends Component {
  render() {
    return (
      <Content>
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>Time</Text>
              <Text note numberOfLines={2}>
                Its time to build a difference .sdfsafdsafdsafds fdsafdsafsd
                dfsdf
              </Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>Time</Text>
              <Text note numberOfLines={2}>
                Its time to build a difference .sdfsafdsafdsafds fdsafdsafsd
                dfsdf
              </Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>Time</Text>
              <Text note numberOfLines={2}>
                Its time to build a difference .sdfsafdsafdsafds fdsafdsafsd
                dfsdf
              </Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      </Content>
    );
  }
}
