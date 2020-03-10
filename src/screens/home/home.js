import React from 'react';
import UINavBar from 'app/components/UI/navbar/navbar';
import { ItemLi } from 'app/components/UI/styles/styles';
// import ModalAuth from 'app/components/UI/modal/auth';
import Footer from 'app/components/UI/footer/footer';
import HomeComponent from 'app/components/home/home';
import Link from 'next/link';

const home = () => (
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
    {/* <ModalAuth /> */}
    <HomeComponent />
    <Footer />
  </>
);

export default home;
