import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthstore from '../store/authStore';

const useSignUpWithEmailAndPassword = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast();
  const loginUser = useAuthstore((state) => state.login);

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.fullname || !inputs.username) {
      showToast('Error', 'Please fill all the fields', 'error');
      return;
    }

      const usersRef = collection(firestore, 'users');

      // Create a query against the collection.
      const q = query(usersRef, where('username', '==', inputs.username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          showToast('Error', 'Username already exists', 'error');
          return
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
        loginUser(userDoc);
      }
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
