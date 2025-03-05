import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../endpoints/productEndpoints';

const useGetProducts = () => {
  return  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

};

export default useGetProducts;
