import {useQuery} from 'react-query';
import {fetchRelation} from '../api/relation';

function useRelation() {
  const {data: relation} = useQuery('relation', fetchRelation);

  return {relation};
}

export default useRelation;
