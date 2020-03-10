import React from 'react';
import Link from 'next/link';

const ListHashmaps = ({ data }) => {
  return (
    <div className="row">
      <div className="col">
        <div className="row">
          <Link href={`/view?id=${data.id}`}>
            <a>
              <h4>{data.title}</h4>
            </a>
          </Link>
        </div>
        <div className="row">
          <Link href={`/view?id=${data.id}`}>
            <a>
              <h6>{data.subtitle}</h6>
            </a>
          </Link>
        </div>
        <div className="row">
          <p>{data.author.name}</p>
        </div>
        <div className="row">
          <p>{data.info}</p>
        </div>
      </div>
      <div className="col col-lg-2">img</div>
    </div>
  );
};

export default ListHashmaps;
