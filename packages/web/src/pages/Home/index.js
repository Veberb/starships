import React, { useState } from 'react'
import {
  Flex,
  Button,
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'
import { MdLightbulbOutline } from 'react-icons/md'

import { Link } from 'react-router-dom'

export const Home = () => {
  const [megaLight, setMegaLight] = useState()

  return (
    <Flex justify="center" alignItems="center">
      <Stack spacing={100} alignItems="center">
        <Text fontSize="4xl">
          Let's check which starship it's better for your journey.
        </Text>

        <InputGroup maxWidth="40%">
          <InputLeftElement
            pointerEvents="none"
            children={<MdLightbulbOutline color="gray.300" />}
          />
          <Input
            type="number"
            pattern=""
            placeholder="Enter Mega Light distance"
            value={megaLight}
            onChange={evt => setMegaLight(evt.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Link to={{ pathname: '/starship', state: { megaLight } }}>
              <Button colorScheme="teal">Check</Button>
            </Link>
          </InputRightElement>
        </InputGroup>
      </Stack>
    </Flex>
  )
}
