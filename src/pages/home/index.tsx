import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { ITweet } from 'src/@types';
import LittleLoading from 'src/components/LittleLoading';
import NextSEO from 'src/components/NextSEO';
import Tweet from 'src/components/Tweet';
import Trends from 'src/components/Trends';
import WhoFollow from 'src/components/WhoFollow';
import WriteTweet from 'src/components/WriteTweet';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import * as S from '../../styles/pages/Home';
import { ensureAuthentication } from 'src/utils/ensureAuthentication';

const Home: React.FC = () => {
  const {
    isEndPage,
    scrollLoading,
    tweets,
    mutateTweets,
    search,
    handleReset,
    ref,
  } = useInfiniteScroll('/tweet');

  useEffect(() => {
    handleReset('', '');
  }, []);

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  return (
    <NextSEO
      title='Tweeter - Home'
      description='Display page with all tweets (timeline)'
    >
      <S.Container>
        <S.Tweets>
          <WriteTweet handleReset={handleReset} mutateTweets={mutateTweets} />
          {tweets?.map((data: ITweet[]) => {
            return data.map((tweet: ITweet, index) => (
              <Tweet key={index} data={tweet} mutateTweets={mutateTweets} />
            ));
          })}
          {scrollLoading && <LittleLoading />}
          {!isEndPage && !scrollLoading && <div ref={ref} />}
        </S.Tweets>
        <S.Aside>
          <Trends search={search} handleReset={handleReset} />
          <WhoFollow />
        </S.Aside>
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

export default Home;
