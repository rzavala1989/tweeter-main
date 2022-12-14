import { GetServerSideProps } from 'next';

import CustomBackground from '../components/CustomBackground';
import SignInForm from '../components/Form/SignInForm';
import NextSEO from 'src/components/NextSEO';

import { ensureAuthentication } from 'src/utils/ensureAuthentication';

const SignIn = () => {
  return (
    <NextSEO
      title='Tweeter - Sign In'
      description='Sign in to Tweeter'
      opacityTransition
    >
      <CustomBackground image={'/background/background.webp'}>
        <SignInForm />
      </CustomBackground>
    </NextSEO>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = await ensureAuthentication(context);
  if (userId) {
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

export default SignIn;
