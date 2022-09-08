import { Search } from '@styled-icons/material-outlined';
import { motion } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { useEffect, useState, FormEvent } from 'react';

import { ITweet, IAuthor, IFilterOptions } from '../../@types';
import { Button } from '../../components/Button';
import FilterTweets from 'src/components/FilterTweets';
import FollowCard from 'src/components/FollowCard';
import LittleLoading from 'src/components/LittleLoading';
import Tweet from 'src/components/Tweet';
import NextSEO from 'src/components/NextSEO';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import * as S from 'src/styles/pages/Explorer';
import { ensureAuthentication } from 'src/utils/ensureAuthentication';
import { fadeInUp } from 'src/utils/variants';

const Explorer = () => {
  const [search, setSearch] = useState('');
  const {
    isEndPage,
    ref,
    scrollLoading,
    tweets,
    mutateTweets,
    filter,
    users,
    handleReset,
  } = useInfiniteScroll('/tweet');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    handleReset(search, filter);
  };

  useEffect(() => {
    handleReset('', 'top');
  }, []);

  useEffect(() => {
    setSearch('');
  }, [filter]);

  return (
    <NextSEO title='Tweeter - Explore' description='Explore tweets and users'>
      <S.Container>
        <FilterTweets
          filter={filter}
          handleReset={handleReset}
          options={[
            IFilterOptions.LATEST,
            IFilterOptions.TOP,
            IFilterOptions.PEOPLE,
            IFilterOptions.MEDIA,
          ]}
        />
        <S.TweetsContainer>
          <S.Search
            onSubmit={(e: FormEvent<Element>) => handleSearch(e)}
            as={motion.form}
            variants={fadeInUp}
            initial='hidden'
            animate='enter'
          >
            <Search
              width={25}
              height={25}
              color='#aeb4bf'
              aria-label='Search icon to search Tweet'
            />
            <input
              type='text'
              placeholder='Search Tweets'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <Button
              type='submit'
              title='Search'
              color={'#2D9CDB'}
              disabled={!search}
              data-cy='search-button'
            />
          </S.Search>
          {filter !== 'people' ? (
            tweets?.map((data: ITweet[]) => {
              return data.map((tweet: ITweet, index) => (
                <Tweet data={tweet} key={index} mutateTweets={mutateTweets} />
              ));
            })
          ) : (
            <S.Cards
              as={motion.div}
              variants={fadeInUp}
              initial='hidden'
              animate='enter'
              exit='exit'
            >
              {users?.map((user: IAuthor, index) => (
                <FollowCard key={index} data={user} />
              ))}
            </S.Cards>
          )}
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

export default Explorer;
