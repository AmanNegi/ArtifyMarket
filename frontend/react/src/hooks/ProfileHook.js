import { useQueryClient, useMutation } from '@tanstack/react-query';
import updateUser, { addFarmImage } from '../pages/Profile/application/profile';
import { toast } from 'react-toastify';

export default function useProfileMutations() {
  const queryClient = useQueryClient();

  const addFarmImageMutation = useMutation({
    mutationFn: (selectedFile) => addFarmImage(selectedFile),
    onSuccess: (e) => {
      toast.success('Image uploaded successfully');
      queryClient.setQueryData(['profile'], (old) => {
        console.log(old, e);
        old.images.push(e);
        return { ...old };
      });
    },
    onError: (e) => {
      console.log(e);
      toast.error('An error occured while uploading the image!');
      queryClient.invalidateQueries(['profile']);
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: (data) => updateUser(data),
    onError: (e) => {
      console.log('error occurred', e);
      toast.error('An error occured while updating the profile!');
      queryClient.invalidateQueries(['profile']);
    },
    onSuccess: (e) => {
      console.log('Success', e);
      toast.success('Profile updated successfully');
      queryClient.setQueryData(['profile'], () => {
        return e;
      });
    }
  });

  return { addFarmImageMutation, updateUserMutation };
}
