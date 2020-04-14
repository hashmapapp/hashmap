import React from 'react';
import PropTypes from 'prop-types';
// import LinkPreview from 'app/components/UI/link-preview/link-preview';
import Star from './components/star';

const Publication = ({ data }) => (
  <article className="rounded-lg overflow-hidden shadow-xl">
    <div className="pt-6">
      <div className="p-4 font-sans font-bold text-xl">{data.title}</div>
      <div className="flex justify-center">
        {data.imageUrl && (
          <img
            className="shadow"
            src={data.imageUrl}
            alt={data.title}
            style={{ maxHeight: '32rem' }}
          />
        )}
      </div>
      <p className="p-4 font-sans text-base md:text-lg text-gray-700">
        {data.description}
      </p>
      {/* <LinkPreview
        data={{
          image:
            'https://avatars0.githubusercontent.com/u/18178570?s=400&u=125429dc6e6986c49ab1841447b2840583544ed1&v=4',
          url: 'https://github.com/kleysonmorais',
          title: 'kleysonmorais (Kleyson Morais) · GitHub',
          description:
            'Computer Scientist. kleysonmorais has 45 repositories available. Follow their code on GitHub.',
        }}
      /> */}
    </div>
    {/* <div className="p-4 flex justify-end md:justify-start">
      <Star rating={0} />
    </div> */}
  </article>
);

Publication.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Publication;
