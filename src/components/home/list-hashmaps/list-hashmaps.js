import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Image } from 'app/components/UI/styles/styles';
import { DARK, DARK_GRAY } from 'app/styles/colors';
import { Avatar } from 'app/components/hashmap/publication/components/style';

const Wrapper = styled.div`
  a {
    color: ${DARK};
    text-decoration: none;
  }

  h6 {
    font-family: 'Open Sans Regular', sans-serif;
    color: ${DARK_GRAY};
  }

  span {
    display: grid;

    &.author {
      font-size: 1.2em;
    }

    &.info {
      color: #545b6294;
      font-size: 1em;
    }
  }
`;

const WrapImage = styled(Image)``;

const WrapAvatar = styled.div`
  padding: 0px;
`;

const ListHashmaps = ({ hashmap }) => {
  return (
    <Wrapper className="row">
      <div className="col">
        <div className="row">
          <Link href={`/view?key=${hashmap.key}`}>
            <a>
              <h4>{hashmap.title}</h4>
            </a>
          </Link>
        </div>
        <div className="row">
          <Link href={`/view?key=${hashmap.key}`}>
            <a>
              <h6>{hashmap.subtitle}</h6>
            </a>
          </Link>
        </div>
        <div className="row pb-4 pt-2">
          <WrapAvatar className="col col-lg-1 text-right">
            <Avatar src="imgs/avatar/pp.jpg" alt="avatar" />
          </WrapAvatar>
          <div className="col-md-auto text-left">
            <span className="author">Nome do cara</span>
            <span className="info">Info - xx/xx/xx</span>
          </div>
        </div>
      </div>
      <div className="col col-lg-3">
        <Link href={`/view?key=${hashmap.key}`}>
          <a>
            <WrapImage src={hashmap.imageUrl} alt="img" />
          </a>
        </Link>
      </div>
    </Wrapper>
  );
};

export default ListHashmaps;
