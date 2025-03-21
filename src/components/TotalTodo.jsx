import { Text } from '@chakra-ui/react'

import { useTodos } from '../store'

const TotalTodo = () => {
  const count = useTodos((state) => state.todos.length)

  return <Text fontWeight="bold">Total: {count}</Text>
}

export { TotalTodo }