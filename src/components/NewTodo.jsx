import { useRef } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
} from '@chakra-ui/react'

import { useTodos } from '../store'

const NewTodo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef()
  const addTodos = useTodos((state) => state.addTodos)

  const handleaddTodos = () => {
    addTodos(ref.current.value)
    onClose()
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        Add new todo
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create new todo</DrawerHeader>

          <DrawerBody>
            <Input
              placeholder="Type here..."
              ref={ref}
              onKeyDown={(e) => e.key === 'Enter' && handleaddTodos()}
              autoFocus
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleaddTodos}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export { NewTodo }