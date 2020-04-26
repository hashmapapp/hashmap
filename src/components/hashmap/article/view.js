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
      <article className="bg-gray-100">
        <div className="container mx-auto py-4">
          <div className="px-4 md:px-24 flex justify-center">
            <img
              className="shadow"
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
            <div className="py-8">
              {pDescription.map((p, index) => (
                <p
                  key={index.toString()}
                  className="font-sans text-base md:text-lg text-gray-800 py-2 px-4 md:px-64"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </article>
      <article className="bg-gray-100">
        <div className="container mx-auto px-4 md:px-64 py-8">
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
