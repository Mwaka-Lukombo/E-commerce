import {Container, VStack,Text, SimpleGrid, useColorMode, useColorModeValue} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import {Link} from 'react-router-dom';
import { userProductStore } from '../store/product';
import { ProductCard } from '../components/ProductCard';

export const HomePage = () => {

 
    const {fetchProduct, products} = userProductStore();

  useEffect(()=>{
   fetchProduct();
  },[products])


  return (
    <Container maxW='container.lg' py={12}>
      
       <VStack spacing={8}>
          <Text
           fontSize={"30"}
           fontWeight={"bold"}
           bgGradient={"linear(to-r, cyan.400, blue.500)"}
           bgClip={"text"}
           textAlign={"center"}
          >  
            Current Products 🚀
          </Text>

          <SimpleGrid
           columns={{
            base:1,
            md:2,
            lg:3
           }}
           spacing={10}
           w={"full"}
          >
            {products.map((product)=> (
              <ProductCard key={product._id} {...product} />
            ))}
          </SimpleGrid>


          {products.length == 0 && (
            <Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color="gray.500"
          >
            No products found 😢{" "}

            <Link to={'/create'}>
              <Text as="span" color='blue.500' _hover={{textDecoration:"underline"}}>
                 Create a product
               </Text>
              </Link>
            </Text>
          )}
       </VStack>
    </Container>
  )
}
