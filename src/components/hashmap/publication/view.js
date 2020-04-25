import React from 'react';
import PropTypes from 'prop-types';
import LinkPreview from 'app/components/UI/link-preview/link-preview';
import Iframe from 'react-iframe';
// import Star from './components/star';

const Publication = ({ data }) => (
  <article className="my-4 bg-white rounded-lg overflow-hidden shadow-xl">
    <div className="pt-4">
      {data.title && (
        <div className="px-4 font-sans font-bold text-xl pb-4 text-gray-800">
          {data.title}
        </div>
      )}
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
      {data.textDescription && (
        <p className="p-4 font-sans text-base md:text-lg text-gray-700">
          {data.textDescription}
        </p>
      )}
      {data.videoYT && (
        <>
          <div className="hidden sm:block" style={{ height: 480 }}>
            <Iframe
              frameborder="0"
              allowfullscreen
              url={data.videoYT.embed}
              width="100%"
              className="h-full"
              id="myId"
              display="initial"
              position="relative"
            />
          </div>
          <div className="block sm:hidden">
            <Iframe
              frameborder="0"
              allowfullscreen
              url={data.videoYT.embed}
              width="100%"
              className="h-56"
              id="myId"
              display="initial"
              position="relative"
            />
          </div>
        </>
      )}
      {data.linksToPreview &&
        data.linksToPreview.map(link => (
          <LinkPreview key={link.url} data={link} />
        ))}
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
