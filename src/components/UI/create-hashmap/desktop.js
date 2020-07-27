import React from 'react';
import { FaEdit } from 'react-icons/fa';

const CreateHashmapDesktop = ({ handlerCreate }) => {
  return (
    <div className="flex justify-between mx-32 mt-12">
      <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Faça a curadoria dos conteúdos que
            <br className="xl:hidden" />
            <span className="text-indigo-600"> você recomenda</span>
          </h2>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Reunimos uma comunidade de pessoas focadas em descobrir,
            compartilhar e criar as melhores recomendações baseadas em suas
            próprias experiências.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <button
                type="button"
                onClick={handlerCreate}
                className="w-full flex items-center justify-center px-2 py-3 border border-transparent text-base 
                leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none 
                focus:border-gray-800 focus:shadow-outline-black transition duration-150 ease-in-out md:py-4 md:text-lg md:px-4"
              >
                <FaEdit size={22} className="mx-2" color="#fff" />
                Iniciar uma Curadoria
              </button>
            </div>
            {/* <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                type="button"
                onClick={() => {}}
                className="w-full flex items-center justify-center px-8 py-3 border 
                text-base leading-6 font-medium rounded-md text-gray-700 bg-gray-100 hover:text-gray-600 
                hover:bg-gray-50 focus:outline-none focus:shadow-outline-gray focus:border-gray-300 
                transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
              >
                Saiba mais
              </button>
            </div> */}
          </div>
        </div>
      </main>
      <div className="">
        <img className="" src="imgs/icons/add_post_1.svg" alt="" />
      </div>
    </div>
  );
};

export default CreateHashmapDesktop;
