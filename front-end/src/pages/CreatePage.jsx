import { Container, VStack, Heading, useColorModeValue, Box, Input, Button, useToast } from '@chakra-ui/react'
import {useState}from 'react'
import { userProductStore } from '../store/product'

export const CreatePage = () => {

  const [newProduct, setNewProdut] = useState({
    name:"",
    price:"",
    image:""
  })

  const toast = useToast()
  const {createProduct} = userProductStore();

  const handleAddProduct = async ()=>{
    const {success, message} =  await createProduct(newProduct);
  
    if(!success){
      toast({
        "title":"Error",
        description:message,
        status:"error",
        isClosable:true
      })
    }else{
      toast({
        "title":"Success",
        description:message,
        status:"success",
        isClosable:true
      })
    }
    setNewProdut("")
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack 
      spacing={8}
      >
      <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
         Create New Product
      </Heading>

      <Box
      w={"full"}
      bg={useColorModeValue("white","gray.800")}
      p={6} rounded={"lg"} shadow={"md"}
      >

        <VStack spacing={4}>
          <Input 
           placeholder='Product Name'
           name='name'
           value={newProduct.name || ''}
           onChange={(e)=> setNewProdut({...newProduct, name: e.target.value})}
          />

          <Input 
           placeholder='price'
           name='price'
           value={newProduct.price || ''}
           onChange={(e)=> setNewProdut({...newProduct, price: e.target.value})}
          />

          <Input 
           placeholder='Image URL'
           name='image'
           value={newProduct.image || ""}
           onChange={(e)=> setNewProdut({...newProduct, image: e.target.value})}
          />

          <Button colorScheme='blue' onClick={handleAddProduct} w="full">
             Add Product
          </Button>
        </VStack>

      </Box>
      </VStack>
    </Container>
    
  )
}
