import React from 'react';
import { GoSmiley } from 'react-icons/go';
import styled from 'styled-components';
import { GRAY_HOVER, LIGTH_1 } from 'app/styles/colors';
import { Icon, IconResize } from './style';

const AddDiv = styled.div`
  padding: 0px;
  margin: 0px;
  max-width: 30px;

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: ${LIGTH_1};
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 2px;
    z-index: 1;
  }

  &.dropdown:hover .dropdown-content {
    display: block;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 5px 2px;
  cursor: pointer;
`;

const GridItem = styled.div`
  padding: 5px 10px 10px 10px;
  &:hover {
    background-color: ${GRAY_HOVER};
  }
`;

const CursorPointer = styled.div`
  cursor: pointer;
`;

const AddReact = () => {
  return (
    <AddDiv className="col dropdown">
      <CursorPointer>
        + <GoSmiley />
      </CursorPointer>
      <div className="dropdown-content">
        <GridContainer>
          <GridItem
            onClick={() => {
              alert('Add Like');
            }}
          >
            <IconResize>
              <Icon src="icons/like.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add heart');
            }}
          >
            <IconResize>
              <Icon src="icons/heart.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add unlike');
            }}
          >
            <IconResize>
              <Icon src="icons/unlike.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add smiley');
            }}
          >
            <IconResize>
              <Icon src="icons/smiley.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add dissatisfied');
            }}
          >
            <IconResize>
              <Icon src="icons/dissatisfied.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add rocket');
            }}
          >
            <IconResize>
              <Icon src="icons/rocket.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add hooray');
            }}
          >
            <IconResize>
              <Icon src="icons/hooray.png" />
            </IconResize>
          </GridItem>
          <GridItem
            onClick={() => {
              alert('Add eyes');
            }}
          >
            <IconResize>
              <Icon src="icons/eyes.png" />
            </IconResize>
          </GridItem>
        </GridContainer>
      </div>
    </AddDiv>
  );
};

export default AddReact;
