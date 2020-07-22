import React, { useMemo, useState } from 'react';
import PublicationView from 'app/components/hashmap/publication/view';
import PropTypes from 'prop-types';

const article = ({ data }) => {
  const [pDescription, setPDescription] = useState([]);
  useMemo(() => {
    if (data.description) {
      setPDescription(data.description.split('\n'));
    }
  }, [data]);

  return (
    <>
      <article>
        <div className="container mx-auto pt-4 pb-2">
          <div className="px-2 md:px-8 flex justify-center">
            <img
              className="md:hidden shadow"
              src={data.urlImage}
              alt={data.textImage}
              style={{ maxHeight: '12rem' }}
            />
            <img
              className="hidden md:block shadow"
              src={data.urlImage}
              alt={data.textImage}
              style={{ maxHeight: '32rem' }}
            />
            {data.textImage && (
              <p className="font-sans my-3 text-center text-gray-600">
                {data.textImage}
              </p>
            )}
          </div>
          {pDescription.length > 0 && (
            <div className="py-8 px-10 md:px-8">
              {pDescription.map((p, index) => (
                <p
                  key={index.toString()}
                  className="font-sans text-lg md:text-xl text-gray-800 py-2"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </article>
      <article>
        <div className="container mx-auto md:px-8 py-2">
          {data.posts.map(post => (
            <PublicationView key={post.key} data={post} />
          ))}
        </div>
      </article>
    </>
  );
};

article.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default article;
