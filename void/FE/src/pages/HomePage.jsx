import React, { useEffect, useState } from 'react'; 
import { 
  Container, 
  Text, 
  VStack, 
  SimpleGrid, 
  Button, 
  Box 
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import ProductCard from "../components/productcard.jsx";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    // Update filtered products based on selected category
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.categories === selectedCategory)
      );
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} mt={8}>
        <Text fontSize="2xl" color="black" fontWeight="bold">
          Select a Category
        </Text>
        <SimpleGrid columns={[2, 3, 6]} spacing={4}>
          {selectedCategory === null && (
            <>
              <Button
                colorScheme="blue"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => setSelectedCategory("Food")}
              >
                Food
              </Button>
              <Button
                colorScheme="purple"
                onClick={() => setSelectedCategory("Clothes")}
              >
                Clothes
              </Button>
              <Button
                colorScheme="orange"
                onClick={() => setSelectedCategory("Furniture")}
              >
                Furniture
              </Button>
              <Button
                colorScheme="yellow"
                onClick={() => setSelectedCategory("Repair")}
              >
                Repair
              </Button>
              <Button
                colorScheme="green"
                onClick={() => setSelectedCategory("Grocery")}
              >
                Grocery
              </Button>
            </>
          )}
          {selectedCategory !== null && (
            <Button
              colorScheme="red"
              onClick={() => setSelectedCategory(null)}
            >
              Switch Category
            </Button>
          )}
        </SimpleGrid>
      </VStack>

      {selectedCategory && (
        <Box
          mt={8}
          transition="opacity 0.5s ease-in-out"
          opacity={selectedCategory ? 1 : 0}
        >
          <Text fontSize="xl" color="gray.700" fontWeight="bold" mb={4}>
            Showing {selectedCategory} Products
          </Text>
          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
