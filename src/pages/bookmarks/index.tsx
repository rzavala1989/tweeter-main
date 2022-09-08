import { GetServerSideProps } from 'next';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import NextSEO from 'src/components/NextSEO';
import { ensureAuthentication } from 'src/utils/ensureAuthentication';
import * as S from 'src/styles/pages/Explorer';
import LittleLoading from 'src/components/LittleLoading';
import FilterTweets from 'src/components/FilterTweets';
import { IFilterOptions, ITweet } from 'src/@types';
import Tweet from 'src/components/Tweet';

const Bookmarks = () => {
  const { user } = useContext(AuthContext);
  const {
    tweets: bookmarks,
    scrollLoading,
    isEndPage,
    ref,
    handleReset,
    mutateTweets,
    filter,
  } = useInfiniteScroll(`/user/${user?.id}/bookmarks`);
  return (
    <NextSEO title='Tweeter - Bookmarks' description='Your bookmarks'>
      <S.Container>
        <FilterTweets
          filter={filter}
          handleReset={handleReset}
          options={[
            IFilterOptions.TWEETS,
            IFilterOptions.MEDIA,
            IFilterOptions.LIKES,
          ]}
        />
        <S.TweetsContainer>
          {bookmarks?.map((data: ITweet[]) => {
            return data.map((bookmark, index: number) => (
              <Tweet key={index} data={bookmark} mutateTweets={mutateTweets} />
            ));
          })}
          {scrollLoading && <LittleLoading />}
          {!isEndPage && !scrollLoading && <div ref={ref} />}
          {!isEndPage && <div style={{ marginBottom: '50rem' }} />}
        </S.TweetsContainer>
      </S.Container>
    </NextSEO>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = await ensureAuthentication(context);
  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Bookmarks;
