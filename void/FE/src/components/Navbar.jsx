import React from 'react';
import { Button, Container, HStack, Flex, Text, useColorMode  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"left"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"left"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>SajhaBiz 🤝</Link>
        </Text>
        
        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button leftIcon={<PlusSquareIcon />} colorScheme="blue" variant="solid">
              
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
