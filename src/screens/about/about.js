import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import { ItemLi } from 'app/components/UI/styles/styles';
import Link from 'next/link';

const about = () => (
  <>
    <UINavBar>
      <ul>
        <ItemLi>
          <Link href="/edit">
            <a>Criar HashMap</a>
          </Link>
        </ItemLi>
        <ItemLi>
          <Link href="/about">
            <a>Sobre</a>
          </Link>
        </ItemLi>
        <ItemLi>
          <Link href="/view">
            <a>Ler</a>
          </Link>
        </ItemLi>
      </ul>
    </UINavBar>
  </>
);

export default about;
