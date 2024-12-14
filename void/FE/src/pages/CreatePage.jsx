import React, { useState } from 'react';
import {
  Container,
  VStack,
  Box,
  Select,
  Heading,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useNavigate } from 'react-router-dom';


const CreatePage = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    fund_needed: "",
    fund_raise: "",
    image: "",
    description: "",
    categories: "",
    perks: [],
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });navigate('/')
    }
    setNewProduct({
      name: "",
      fund_needed: "",
      fund_raise: "",
      image: "",
      description: "",
      perks: [],
    });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Fund Needed"
              name="fund_needed"
              type="number"
              value={newProduct.fund_needed}
              onChange={(e) =>
                setNewProduct({ ...newProduct, fund_needed: e.target.value })
              }
            />
            <Input
              placeholder="Fund Raised"
              name="fund_raise"
              type="number"
              value={newProduct.fund_raise}
              onChange={(e) =>
                setNewProduct({ ...newProduct, fund_raise: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Input
              placeholder="Description"
              name="description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
        
            <Select
              placeholder="Select Category"
              value={newProduct.categories}
              onChange={(e) =>
              setNewProduct({ ...newProduct, categories: e.target.value })
              }
            >
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Clothes">Clothes</option>
              <option value="Repair">Repair</option>
              <option value="Electronics">Electronics</option>
            </Select>
            <Input
              placeholder="Perks (comma separated)"
              name="perks"
              value={newProduct.perks.join(", ")}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  perks: e.target.value.split(", ").map((perk) => perk.trim()),
                })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>

          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
