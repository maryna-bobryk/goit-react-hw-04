import s from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleLoadMoreBtn }) => {
  return (
    <div>
      <button onClick={handleLoadMoreBtn} className={s.loadMoreBtn}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
