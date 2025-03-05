import { useQuery } from '@tanstack/react-query';
import { fetchBanners } from '../../endpoints/bannerEndpoints';

const useGetBanners = () => {
  return  useQuery({
    queryKey: ['banners'],
    queryFn: fetchBanners,
  })

};

export default useGetBanners;
