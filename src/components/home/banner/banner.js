import React from 'react';
import styled, { keyframes } from 'styled-components';
import UINavBar from 'app/components/UI/navbar/navbar';
import Footer from 'app/components/UI/footer/footer';

const animate = keyframes`
    0% {
      transform: translate(0px, 0px);
      animation-timing-function: ease-in-out;
    }

    50% {
      transform: translate(0px, 12px);
      animation-timing-function: ease-in-out;
    }

    100% {
      transform: translate(0px, 0px);
      animation-timing-function: ease-in-out;
    }
`;

const ImageAnimation = styled.div`
  -webkit-animation: ${animate} 5s linear infinite;
  animation: ${animate} 5s linear infinite;
`;

const Banner = () => {
  return (
    <>
      <UINavBar />
      <div className="md:px-64 text-center pt-16 md:pt-16 md:pt-32">
        <ImageAnimation className="flex justify-center">
          <img
            className="px-24 xl:w-2/4"
            src="imgs/icons/wait.svg"
            alt="Thank You"
          />
        </ImageAnimation>
        <p className="px-24 pt-8 md:pb-12 md:pt-12 font-sans text-lg text-gray-600 text-center">
          Os melhores <strong>Hashmaps</strong> aqui, em breve.
        </p>
      </div>
      <div className="py-12 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase">
              Hashmap
            </p>
            <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              Ensine menos, recomende mais.
            </h3>
            <p className="mt-4 max-w-2xl text-xl leading-7 text-gray-600 lg:mx-auto">
              Adicione vídeos, imagens, livros, textos, links externos sobre o
              que você quiser falar.
            </p>
          </div>

          <div className="mt-10">
            <ul className="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
              <li>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Combinatividade
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-600">
                      Descubra que é possível criar conteúdos inéditos apenas
                      combinando-os, ouse nos temas, misture e recicle bons
                      conteúdos que foram perdidos no tempo e espaço.
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Customização
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-600">
                      Organize seus conteúdos, seja para estudo, aprendizado,
                      entretenimento ou o que der na teia.
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Comunidade
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-600">
                      Permita que outras pessoas também aprendam e descubram
                      novas experiências baseadas nas suas recomendações. Uma
                      boa recomendação é uma possibilidade de expandir a sua
                      satisfação em um outro ser humano.
                    </p>
                  </div>
                </div>
              </li>
              <li className="mt-10 md:mt-0">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                      <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg leading-6 font-medium text-gray-900">
                      Curadoria
                    </h5>
                    <p className="mt-2 text-base leading-6 text-gray-600">
                      O mundo está cheio de algoritmos que escolhem aquilo que
                      você deveria ver, ouvir e sentir, monte você mesmo boas
                      recomendações de conteúdos sobre o tema que preferir e
                      permita que outras pessoas possam também encontrá-los.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Banner;
