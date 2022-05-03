import create, {StateCreator, State} from 'zustand';
import {devtools} from 'zustand/middleware'
import { IDGenerate } from '../helpers/IDGenerate';

interface Task {
    id: string;
    title: string;
    createAt: number;
}

interface ToDotask {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (title: string, id: string) => void;
    deleteTask: (id: number) => void;
}

function toDoStore(obj: any): obj is ToDotask {
return 'tasks' in obj
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>):StateCreator<T> =>  (set, get, api) => config((nextState, ...args) => {
    if (toDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
        nextState.tasks
    ))
   }
   set(nextState, ...args)
}, get, api)

const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]'))

export const useToDoStore = create<ToDotask>(localStorageUpdate(devtools((set, get) => ({
    tasks: currentState,

    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: IDGenerate(),
            title,
            createAt: Date.now()
        };
        set({
            tasks: [...tasks, newTask]
        })
    },

    updateTask: (title: string, id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },

    deleteTask: (createAt: number) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.createAt !== createAt)
        })

    },
}))) );
