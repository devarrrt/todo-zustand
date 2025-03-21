import { Divider, VStack } from '@chakra-ui/react'

import { Filter } from './components/Filter'
import { NewTodo } from './components/NewTodo'
import { TodoList } from './components/TodoList'
import { TotalTodo } from './components/TotalTodo'
import { FetchTodos } from './components/FetchTodos'

function App() {
  return (
    <VStack spacing={4}>
      <Filter />
      <TodoList />
      <Divider />
      <TotalTodo />
      <NewTodo />
      <FetchTodos/>
    </VStack>
  )
}

export default App