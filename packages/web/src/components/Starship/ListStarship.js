import React from 'react'

import { Table, Thead, Tr, Tbody, Td, Th } from '@chakra-ui/react'

const ListStarship = ({ listStarship = [] }) => {
  return (
    <>
      <Table size="md" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            <Th>MGLT</Th>
            <Th>Stops</Th>
          </Tr>
        </Thead>
        <Tbody>
          {listStarship.map((startship, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{startship.name}</Td>
              <Td>{startship.MGLT}</Td>
              <Td>{startship.stops}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default ListStarship
