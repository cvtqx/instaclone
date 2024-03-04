import { Flex, Image, Text } from '@chakra-ui/react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';
import useAuthstore from '../../store/authStore';
import { doc, setDoc } from 'firebase/firestore';

const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthstore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast('Error', error.message, 'error');
        return
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split('@')[0],
          fullname: newUser.user.displayName,
          bio: '',
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
        //add data to local storage
        localStorage.setItem('user-info', JSON.stringify(userDoc));
        loginUser(userDoc);

      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <Flex alignItems={'center'} justifyContent={'center'} cursor={'pointer'} onClick={handleGoogleAuth}>
      <Image src='google.png' w={5} alt='Google logo' />
      <Text mx='2' color={'blue.500'}>
        {' '}
        {prefix} with Google
      </Text>
    </Flex>
  );
}

export default GoogleAuth