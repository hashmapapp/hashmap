import React from 'react';
import HeaderEdit from 'app/components/hashmap/header/edit';
import ArticleEdit from 'app/components/hashmap/article/edit';

const SectionHashmapEdit = () => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-lg-8">
          <HeaderEdit />
          <ArticleEdit />
        </div>
      </div>
    </div>
  );
};

export default SectionHashmapEdit;
