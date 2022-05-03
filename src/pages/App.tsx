import React, { useEffect } from 'react'

import InputPlus from '../components/InputPlus'
import TaskItem from '../components/TaskItem'

import { useToDoStore } from '../store/useTodoStore'

import '../styles/reset.css'
import '../styles/common.css'
import './AppStyles.css'

const App: React.FC = () => {
  const [
    tasks, createTask, updateTask, deleteTask] = useToDoStore(state => [
      state.tasks, state.createTask, state.updateTask, state.deleteTask])

  return (
    <article className='article'>
      <h1 className='articleTitle'> To Do list  </h1>
      <section className='articleSection'>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title)
            }
          }} />
      </section>
      <section className='articleSection'>
        {tasks.length ? (
          tasks.map(item => (
            <TaskItem
              {...item}
              key={item.id}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))
        ) : (<p className='articleSectionToDo'> Задач пока нет </p>)}
      </section>
    </article>
  )
}

export default App
