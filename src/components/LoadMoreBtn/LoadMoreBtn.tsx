import React, { FC } from 'react';
import s from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  handleLoadMoreBtn: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ handleLoadMoreBtn }) => {
  return (
    <div>
      <button onClick={handleLoadMoreBtn} className={s.loadMoreBtn}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
