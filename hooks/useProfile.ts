import {useQuery} from 'react-query';
import {fetchProfile} from '../api/profile';

function useProfile() {
  const {data: profile} = useQuery('profile', fetchProfile);

  return {profile};
}

export default useProfile;
