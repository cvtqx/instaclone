import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"

const SuggestedUsers = () => {
  return (
      <VStack py={8} px={6} gap={4}>
          <SuggestedHeader />
          <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
               <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                  Suggested for you
              </Text>
              <Text fontSize={12} fontWeight={'bold'} _hover={{color:'gray.400'}} cursor={'pointer'}>
                  See All
              </Text>
          </Flex>
          <SuggestedUser name="Dan Abramov" followers="123" avatar="https://bit.ly/dan_abramov" />
          <SuggestedUser name="Ryan Florence" followers="123432" avatar="https://bit.ly/ryan_florence" />
           <SuggestedUser name="Chris Nwamba" followers="5999" avatar="https://bit.ly/code-beast" />
          
          <Box
              fontSize={12}
              color={'gray.500'}
              mt={5}
          alignSelf={'start'}>
              @ Built by {' '} 
              <Link href='https://www.olgayudkin.com/' target="_blank" color='blue.500' fontSize={14}>Olga Yudkin</Link>
          </Box>
    </VStack>
  )
}

export default SuggestedUsers