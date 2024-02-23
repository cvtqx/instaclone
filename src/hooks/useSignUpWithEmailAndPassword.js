import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import useShowToast from './useShowToast';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.fullname || !inputs.username) {
      showToast('Error', 'Please fill all the fields', 'error');
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      if (!newUser && error) {
        showToast('Error', error.message, 'error');
        return;
      }
      if (newUser) {
        //create new user document in the firebase
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullname: inputs.fullname,
          bio: '',
          profilePicURL: '',
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc);
        //add data to local storage
        localStorage.setItem('user-info', JSON.stringify(userDoc));
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
