import { Button, Container,Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"

//icons
import {
    FaFacebook,
    FaMoon,
    FaPlusSquare,
    FaSun
} from 'react-icons/fa';
import { userProductStore } from "../store/product";
import { useStore } from "zustand";




function NavBar() {
    const {colorMode, toggleColorMode} = useColorMode();
    const { products } = userProductStore();

  return (
    <>
    <Container maxW="1140px" px={4}>
        <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}
        >

            <Text
               fontSize={{base:"22", sm:"28"}}
               fontWeight={"bold"}
               textTransform={"uppercase"}
               textAlign={"center"}
               bgGradient={"linear(to-r, cyan.400, blue.500)"}
               bgClip={"text"}
            >
            <Link to={"/"}>Product store 🛒</Link>
          </Text>
          <HStack spacing={2} alignItems={"center"}>
            <Link to='/create'>
                 <Button>
                <FaPlusSquare />
            </Button>            
            </Link>

            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <FaMoon /> : <FaSun size="20" />}
            </Button>
          </HStack>

         
        </Flex>
    </Container>
    </>
  )
}

export default NavBar