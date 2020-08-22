import React from 'react';
import {Container, Button, Icon, Left} from 'native-base';
import {
  StyledHeader,
  StyledTitle,
  StyledBody,
  StyledButtonContainer,
} from './style';

function Headers(props) {
  return (
    <StyledHeader>
      <StyledBody>
        <StyledTitle>Cryptocurrency App</StyledTitle>
      </StyledBody>
    </StyledHeader>
  );
}

export default Headers;
