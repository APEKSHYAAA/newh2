import { Box, Heading, Image, Text, useColorModeValue, Progress, Button } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import { useDisclosure, useToast } from '@chakra-ui/react'; // Add this import for modal control
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");
  const { updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUpdateProduct = async (pid, updatedProduct) => {
  const { success, message } = await updateProduct(pid, updatedProduct);
  if (!success) {
    toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 3000,
    isClosable: true,
    });
  } else {
    toast({
    title: 'Success',
    description: message,
    status: 'success',
    duration: 3000,
    isClosable: true,
    });
  }
  onClose();
  }

  // Calculate funding progress
  const fundingProgress = (product.fund_raise / product.fund_needed) * 100;

  return (
  <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    bg={bg}
  >
    <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
    <Box p={4}>
    <Heading as='h3' size='lg' mb={2}>
      {product.name}
    </Heading>
    <Text fontSize='l' color={textColor} mb={4}>
      <strong>Fund Needed:</strong> Nrs. {product.fund_needed}
    </Text>
    <Text fontSize='l' color={textColor} mb={4}>
      <strong>Fund Raised:</strong> Nrs. {product.fund_raise}
    </Text>

    {/* Progress bar */}
    <Progress
      value={fundingProgress}
      size='sm'
      colorScheme='green'
      mb={2}
      borderRadius='md'
    />
    <Text fontSize='sm' color={textColor} mb={2}>
      {fundingProgress.toFixed(2)}% raised of Nrs. {product.fund_needed}
    </Text>

    <Button colorScheme='blue' onClick={onOpen}>Learn More</Button>
    </Box>

    {/* Modal for Learn More */}
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Product Details</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Text><strong>Name:</strong> {updatedProduct.name}</Text>
      <Text><strong>Fund Needed:</strong> Nrs. {updatedProduct.fund_needed}</Text>
      <Text><strong>Fund Raised:</strong> Nrs. {updatedProduct.fund_raise}</Text>
      <Text><strong>Description:</strong> {updatedProduct.description}</Text>
      <Text><strong>Perks:</strong> {updatedProduct.perks.join(', ')}</Text>
      </ModalBody>

      <ModalFooter>
      <Button variant='ghost' mr={3} onClick={onClose}>
        Close
      </Button>
      </ModalFooter>
    </ModalContent>
    </Modal>
  </Box>
  );
};

export default ProductCard;
