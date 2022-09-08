import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IUserData, IFilterOptions, ITweet } from 'src/@types';

import { Loading } from 'src/components/Loading/Loading';
import NextSEO from '../../components/NextSEO';
import { useFetch } from 'src/hooks/useFetch';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { ensureAuthentication } from 'src/utils/ensureAuthentication';
//convention for styled components
import * as S from '../../styles/pages/Profile';

//pull in each story component
import BackgroundProfile from 'src/components/BackgroundProfile';
import AboutProfile from 'src/components/AboutProfile';
import FilterTweets from 'src/components/FilterTweets';
import Tweet from 'src/components/Tweet';
import LittleLoading from 'src/components/LittleLoading';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: user }: IUserData = useFetch(`/user/${id}`);

  useEffect(() => {
    console.log(tweets);
  }, [user]);

  useEffect(() => {
    handleReset('', '');
  }, [id]);

  const {
    isEndPage,
    scrollLoading,
    tweets,
    mutateTweets,
    filter,
    handleReset,
    ref,
  } = useInfiniteScroll(`/tweet/${id}`);

  if (!user) {
    return <Loading />;
  }
  return (
    <NextSEO
      title='Tweeter - Profile'
      description='Display page with your profile information'
    >
      <S.Container>
        <BackgroundProfile
          background={user.data.background}
          userId={user.data.id}
        />
        <AboutProfile userInformations={user.data} />
        <S.Tweets>
          <FilterTweets
            filter={filter}
            handleReset={handleReset}
            options={[
              IFilterOptions.TWEETS,
              IFilterOptions.MEDIA,
              IFilterOptions.LIKES,
            ]}
          />
          <div>
            {tweets?.map((data: ITweet[]) => {
              return data.map((tweet, index) => {
                return (
                  <Tweet data={tweet} key={index} mutateTweets={mutateTweets} />
                );
              });
            })}
            {!isEndPage && !scrollLoading && <div ref={ref} />}
            {scrollLoading && <LittleLoading />}
            {!isEndPage && <div style={{ marginBottom: '30rem' }} />}
          </div>
        </S.Tweets>
      </S.Container>
    </NextSEO>
  );
}

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
