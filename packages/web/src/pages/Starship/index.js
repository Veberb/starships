import React, { useState, useEffect } from 'react'
import { Flex, Stack, Text, Spinner } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'

import api, { GET_STARSHIPS } from '../../axios'
import ListStarship from '../../components/Starship/ListStarship'

export const Starships = () => {
  const [loading, setLoading] = useState(1)
  const [starShips, setStarShips] = useState([])

  const getHoursConsumables = precision => {
    switch (precision) {
      case 'year':
      case 'years':
        return 8640
      case 'month':
      case 'months':
        return 720
      case 'week':
      case 'weeks':
        return 168
      default:
        return 24
    }
  }

  const getStarships = async () => {
    const { data } = await api.get(GET_STARSHIPS, { params: { page: 1 } })

    const starshipStops = data.results.map(starship => {
      const [time, precision] = starship.consumables.split(' ')
      const hoursTravelling = getHoursConsumables(precision)

      return {
        ...starship,
        stops: Math.floor(1000000 / (starship.MGLT * hoursTravelling * time))
      }
    })
    setStarShips(starshipStops)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getStarships()
  }, [])

  return (
    <Flex justify="center" alignItems="center">
      <Stack spacing={100} alignItems="center">
        <Text fontSize="4xl">
          This is our starships avaiable for your travel! Choose wisely
        </Text>
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        {!loading && (
          <InfiniteScroll
            dataLength={starShips.length}
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
          >
            <ListStarship listStarship={starShips} />
          </InfiniteScroll>
        )}
      </Stack>
    </Flex>
  )
}
