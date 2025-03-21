import { Button, Stack } from '@chakra-ui/react'

import { useFilters } from '../store'

const Filter = () => {
  const { filter, setFilter } = useFilters()

  return (
    <Stack spacing={2} direction="row" mt="8">
      <Button
        disabled={filter === 'all'}
        onClick={() => setFilter('all')}
        colorScheme="blue"
      >
        All
      </Button>
      <Button
        disabled={filter === 'uncompleted'}
        onClick={() => setFilter('uncompleted')}
      >
        Not completed
      </Button>
      <Button
        disabled={filter === 'completed'}
        onClick={() => setFilter('completed')}
      >
        Completed
      </Button>
    </Stack>
  )
}

export { Filter }