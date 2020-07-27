import React, { useState } from 'react';
import HeaderView from 'app/components/hashmap/header/view';
import ArticleView from 'app/components/hashmap/article/view';
import Footer from 'app/components/hashmap/footer/footer';
import CollaboratorsView from 'app/components/hashmap/collaborators/view';
import PropTypes from 'prop-types';
import ShareButtons from '../UI/share-buttons/share-buttons';

import cx from 'classnames';

const SectionHashmapView = ({ hashmap, posts }) => {
  const [activeTab, setActiveTab] = useState(1);

  const headerData = {
    title: hashmap.title,
    subtitle: hashmap.subtitle,
    createdAt: hashmap.createdAt,
    updatedAt: hashmap.updatedAt,
  };
  const articleData = {
    description: hashmap.description,
    posts,
    urlImage: hashmap.imageUrl,
    textImage: hashmap.textImage,
  };
  const authorData = {
    displayName: hashmap.author.displayName,
    photoURL: hashmap.author.photoURL,
    username: hashmap.author.username,
    bio: hashmap.author.bio,
  };
  return (
    <>
      <div className="container mx-auto lg:hidden">
        <HeaderView data={headerData} />
        <ul className="flex border-b">
          <li className="flex-1 mr-2 ml-2" onClick={() => setActiveTab(1)}>
            <a className={cx("text-center block py-2 px-4",
              { 'border-l border-t border-r rounded-t font-bold': activeTab === 1 }
            )}>
              Publicação
            </a>
          </li>
          <li className="flex-1 mr-2" onClick={() => setActiveTab(2)}>
            <a className={cx("text-center block py-2 px-4",
              { 'border-l border-t border-r rounded-t font-bold': activeTab === 2 }
            )}>
              Settings
            </a>
          </li>
        </ul>
        {activeTab === 1 &&
          <>
            <ArticleView data={articleData} />
            <ShareButtons title={hashmap.title} summary={hashmap.subtitle} />
            <CollaboratorsView data={authorData} />
          </>
        }

        {activeTab === 2 &&
          <>
            Settings Solicitar Colaboração
          </>
        }
      </div>

      <div className="container mx-auto px-24 hidden lg:flex">
        <div className="w-3/4 h-12">
          <HeaderView data={headerData} />
          <ArticleView data={articleData} />
          <ShareButtons title={hashmap.title} summary={hashmap.subtitle} />
          {/* <Footer data={authorData} /> */}
        </div>
        <div className="w-1/4 h-12">
          <CollaboratorsView data={authorData} />
        </div>
      </div>
    </>
  );
};

SectionHashmapView.propTypes = {
  hashmap: PropTypes.shape().isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default SectionHashmapView;
