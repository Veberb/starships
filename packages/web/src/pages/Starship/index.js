import React, { useState, useEffect } from 'react'
import { Flex, Stack, Text, Spinner, Button } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, Link } from 'react-router-dom'

import api, { GET_STARSHIPS } from '../../axios'
import ListStarship from '../../components/Starship/ListStarship'

export const Starships = () => {
  const location = useLocation()
  const { megaLight } = location.state

  const [{ starShips, pagination, loading }, setState] = useState({
    starShips: [],
    loading: false,
    pagination: {
      page: 1,
      hasMore: true
    }
  })

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
    const { data } = await api.get(GET_STARSHIPS, {
      params: { page: pagination.page }
    })

    const starshipStops = data.results.map(starship => {
      const [time, precision] = starship.consumables.split(' ')
      const hoursTravelling = getHoursConsumables(precision)

      return {
        ...starship,
        stops:
          starship.MGLT !== 'unknown'
            ? Math.floor(
                megaLight || 1 / (starship.MGLT * hoursTravelling * time)
              )
            : 'unknown'
      }
    })
    setState(state => ({
      ...state,
      starShips: [...state.starShips, ...starshipStops],
      loading: false,
      pagination: {
        page: +state.pagination.page + 1,
        hasMore: starshipStops.length === 10
      }
    }))
  }

  useEffect(() => {
    setState(state => ({ ...state, loading: true }))
    getStarships()
  }, [])

  return (
    <Flex justify="center" alignItems="center">
      <Stack spacing={100} alignItems="center">
        <Text fontSize="4xl">
          This is our starships avaiable for your travel! Choose wisely
        </Text>
        <Link to={{ pathname: '/' }}>
          <Button colorScheme="teal">Change MGLT</Button>
        </Link>
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
          <div id="scrollableDiv" style={{ height: 400, overflow: 'auto' }}>
            <InfiniteScroll
              dataLength={starShips.length}
              next={getStarships}
              hasMore={pagination.hasMore}
              loader={
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              }
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              scrollableTarget="scrollableDiv"
            >
              <ListStarship listStarship={starShips} />
            </InfiniteScroll>
          </div>
        )}
      </Stack>
    </Flex>
  )
}
