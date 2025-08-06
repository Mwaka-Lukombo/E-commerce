import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"

import { DeleteIcon, EditIcon} from '@chakra-ui/icons';
import { userProductStore } from "../store/product";

//hooks
import {useState, useEffect} from 'react';

export const ProductCard = ({_id,name, price, image}) => {
    const [updateProduct, setUpdateProduct] = useState({name,price,image})
    const textColor = useColorModeValue("gray.500","gray.200");
      const bg = useColorModeValue("white","gray.800");

        const {deleteProduct, updateProducts} = userProductStore();
         
        //effect ui
         const toast = useToast();
          const {isOpen, onOpen, onClose} = useDisclosure();


    //handleDelete
    const handleDelete = async (id) =>{
        const {success, message } =  await deleteProduct(id);

        if(!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                duration:3000,
                isClosable:true
            })
        }else{
            toast({
                title: "Success",
                description: message,
                status:"success",
                duration:3000,
                isClosable:true
            })
        }
    }

    //handleUpdate
    const handleUpdateProduct = async (id)=>{
      const {success, message} = await updateProducts(id,updateProduct);
       onClose();

       if(!success){
        toast({
          title:"Error",
          description:message,
          status:"error",
          duration:3000,
          isClosable:true
        })
       }else{
         toast({
          title:"Success",
          description:message,
          status:"success",
          duration:3000,
          isClosable:true
         })
       }
    }

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      transition={'all 0.3s'}
      _hover={{transform:"translateY(-5px)", shadow:"xl"}}
      bg={bg}
    >
      <Image src={image} alt={name} h={48} w="full" objectFit={"cover"} />

      <Box p={4}>
        <Heading as="h3" size="md" mb="2">
         {name}
        </Heading>

        <Text
          fontWeight="bold"
           fontSize="xl" 
           color={textColor}
           mb={4}
        >
          ${price}
        </Text>
        
        <HStack>
            <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
            <IconButton icon={<DeleteIcon />} onClick={() => {handleDelete(_id)}} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <VStack spacing={4}>
              <Input 
                placeholder="Product Name"
                name="name"
                value={updateProduct.name}
                onChange={(e)=> setUpdateProduct({...updateProduct, name:e.target.value})}
              />

              <Input 
               placeholder="Price"
               name="price"
               type="number"
               value={updateProduct.price}
               onChange={(e)=> setUpdateProduct({updateProduct, price: e.target.value})}
              />

              <Input 
              placeholder="Image URL"
              name="image"
              value={updateProduct.image}
              onChange={(e)=> setUpdateProduct({updateProduct, image: e.target.value})}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=> handleUpdateProduct(_id)}>
              update
            </Button>

            <Button variant={'ghost'} onClick={onClose}>
               Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      
    </Box>
  )
}
