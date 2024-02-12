import { Box, Button, Flex, Image, Input, VStack, Text } from '@chakra-ui/react'
import React, {useState} from 'react'

const AuthForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
          <VStack spacing={4}>
              <Image src='/logo.png' h={24} cursor={"pointer"} alt="Instagram" />
              <Input
                  placeholder='Email'
                  fontSize={14}
                  type='email'
              />
               <Input
                  placeholder='Password'
                  fontSize={14}
                  type='password'
              />
              {!isLoggedIn ? (
                <Input
                  placeholder='Confirm Password'
                  fontSize={14}
                  type='password'
              />
              ) : null}
              <Button w={"full"} colorScheme='blue' size={'sm'} fontSize={14}>
                  {isLoggedIn ? "Log in" : "Sign up"}
              </Button>

              {/* ------OR------- */}
              <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                  <Box flex={2} h={"1px"} bg={"gray.400"} />
                  <Text mx={1} color={"white"}>OR</Text>
                  <Box flex={2} h={"1px"} bg={"gray.400"} />
              </Flex>

              <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
                  <Image src='google.png' w={5} alt='Google logo' />
                  <Text mx='2' color={'blue.500'}> Log in with Google</Text>
              </Flex>
          </VStack> 
          </Box>
          <Box border={"1px solid gray"} borderRadius={4} padding={5}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                  <Box mx={2} fontSize={14}>
                      {isLoggedIn ? "Don't have an account?" : "Already have an acccount?"}
                  </Box>
                  <Box onClick={() => setIsLoggedIn(!isLoggedIn)} coloe={"blue.500"} cursor={"pointer"}>
                      {isLoggedIn ? "Sign Up" : "Log In"
                      }
                  </Box>
              </Flex>             
          </Box>
          </>
  )
}

export default AuthForm