import { GetServerSideProps } from 'next';
import CustomBackground from '../../components/CustomBackground';
import SignUpForm from '../../components/Form/SignUpForm';
import NextSEO from '../../components/NextSEO';
import { ensureAuthentication } from '../../utils/ensureAuthentication';

const SignUp = () => {
  return (
    <NextSEO
      title='Tweeter - Sign Up'
      description='Sign up for Tweeter'
      opacityTransition
    >
      <CustomBackground image={'/background/background.webp'}>
        <SignUpForm />
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

export default SignUp;
