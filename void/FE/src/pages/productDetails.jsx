import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image } from '@chakra-ui/react';

const ProductDetailPage = () => {
  const { id } = useParams();

  // Fetch the product details using the ID
  // Example: const product = products.find((p) => p._id === id);

  return (
    <>hi</>
  );
};

export default ProductDetailPage;
