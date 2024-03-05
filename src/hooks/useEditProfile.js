import { useState } from 'react';
import useAuthstore from '../store/authStore';
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthstore(state => state.user);
    const setAuthUser = useAuthstore((state) => state.setUser);
    const setUserProfile = useUserProfileStore(state => state.setUserProfile)


    const showToast = useShowToast();

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, 'users', authUser.uid);

        let URL = ''
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, 'data_url');
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUser = {
                ...authUser,
              fullname: inputs.fullname || authUser.fullname,
              username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
              profilePicURL: URL ||authUser.profilePicURL,
            };

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem('user-info', JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast('Success', 'Profile updated successfully', 'success');

        } catch (error) {
            showToast('Error', error.message, 'error')
        }
        
    }
    return {editProfile,isUpdating}
}

export default useEditProfile