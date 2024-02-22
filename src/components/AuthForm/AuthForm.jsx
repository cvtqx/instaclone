import { Box,  Flex, Image,  VStack, Text } from '@chakra-ui/react'
import  {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

const AuthForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
          <VStack spacing={4}>
              <Image src='/logo.png' h={24} cursor={"pointer"} alt="Instagram" />
             {isLoggedIn ? <Login /> : <Signup /> }
             

              {/* ------OR------- */}
              <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                  <Box flex={2} h={"1px"} bg={"gray.400"} />
                  <Text mx={1} color={"white"}>OR</Text>
                  <Box flex={2} h={"1px"} bg={"gray.400"} />
              </Flex>

              <GoogleAuth />
          </VStack> 
          </Box>
          <Box border={"1px solid gray"} borderRadius={4} padding={5}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                  <Box mx={2} fontSize={14}>
                      {isLoggedIn ? "Don't have an account?" : "Already have an acccount?"}
                  </Box>
                  <Box onClick={() => setIsLoggedIn(!isLoggedIn)} color={"blue.500"} cursor={"pointer"}>
                      {isLoggedIn ? "Sign up" : "Log in"
                      }
                  </Box>
              </Flex>             
          </Box>
          </>
  )
}

export default AuthForm