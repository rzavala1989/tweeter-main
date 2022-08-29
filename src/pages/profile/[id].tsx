import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IUserData } from 'src/@types';
import { Loading } from 'src/components/Loading/Loading';
import { useFetch } from 'src/hooks/useFetch';
import { ensureAuthentication } from 'src/utils/ensureAuthentication';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { data: user }: IUserData = useFetch(`/users/${id}`);
  if (!user) {
    return <Loading />;
  }
  return <div>found user</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = await ensureAuthentication(context);
  if (!userId) {
    return {
      redirect: {
        destination: '/profile/' + userId,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
