import {useQuery} from 'react-query';
import {fetchProfile} from '../api/profile';

function useProfile() {
  const {data: profile} = useQuery('profile', fetchProfile, {
    suspense: true,
  });

  return {profile};
}

export default useProfile;
