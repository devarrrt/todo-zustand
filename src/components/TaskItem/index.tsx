import React, { useState, useRef, useEffect } from 'react'

import './TaskItemStyle.css'

type ITaskItem = {
  id: string;
  title: string;
  createAt: number;
  deleteTask: (createAt: number) => void;
  updateTask: (title: string, id: string) => void
}

const EditSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57ff68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>

const TrashSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57ff68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>

const plusSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7e57ff68" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>


const TaskItem: React.FC<ITaskItem> = ({ id, title, createAt, deleteTask, updateTask }) => {
  const [checked, setChecked] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [value, setValue] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditMode) {
      inputRef?.current?.focus()
    }
   }, [isEditMode])

  const checkedTask = (e: any, createAt: number) => {
    setChecked(e.target.checked)

    if (e.target.checked) {
      deleteTask(createAt)
    }
  }

  const handleDelete = () => {
    if (confirm("Действительно удалить задачу?")) {
      deleteTask(createAt)
    }
  }

  return (
    <div className='TaskItem'>
      <label className='TaskItemLabel'>
        <input type="checkbox"
          ref={inputRef}
          checked={checked}
          onChange={(e) => checkedTask(e, createAt)}
          className="TaskItemCheckbox"
          disabled={isEditMode}
        />
        {isEditMode ?
          <input type="text" value={value}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateTask(value, id)
                setIsEditMode(false)
              }
            }}
            onChange={(e) => setValue(e.target.value)}
            className="TaskItemInput" /> :
          <h3 className='TaskItemTitle'> {title} </h3>
        }
      </label>
     {isEditMode ? 
        <button aria-label='Save'
          className='TaskButtonEdit'
          onClick={() => {
            updateTask(value, id)
            setIsEditMode(false)
          }}>
          {plusSvg}
        </button>
    :
    <>
          <button aria-label='Edit'
            className='TaskButtonEdit'
            onClick={() => { setIsEditMode(!isEditMode) }}>
            {EditSvg}
          </button>
          <button aria-label='Delete'
            className='TaskButtonDelete'
            onClick={() => handleDelete()}
          >
            {TrashSvg}
          </button>
    </>
    }

    </div>
  )
}

export default TaskItem