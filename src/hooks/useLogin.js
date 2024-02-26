import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from './useShowToast';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase/firebase';
import useAuthstore from '../store/authStore';

const useLogin = () => {
  const showToast = useShowToast();
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthstore((state) => state.login);

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            showToast('Error', 'Please fill all the fields', 'error');
            return;
        };

        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

            if (userCred) {
                const docRef = doc(firestore, 'users', userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
                loginUser(docSnap.data());
            }
          } catch (error) {
            showToast('Error', error.emssage, 'error');
          }
    }
    
    return {
        loading, error, login
    }
};

export default useLogin;
