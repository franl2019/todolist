import { REMOVE_TODO, SET_DOING, SET_TODO, SET_TODO_LIST, SET_TODO_STATUS } from "@/store/actionTypes";
import { ITodo, TODO_STATUS } from "@/types"
import { watch } from "@vue/runtime-core";
import { Store, useStore } from "vuex"

export interface IUseTodo {
    setTodo: (value:string) => void;
    setTodoList: () => void;
    removeTodo: (id:number) => void;
    setStatus: (id:number) => void;
    setDoing: (id:number) => void;
}

function useTodo():IUseTodo {

    const store:Store<any> = useStore();
    const { setLocalStorage ,getLocalStorage} = useLocalStorage();
    const todoList:ITodo[] = getLocalStorage();

    watch(()=>{
        return store.state.list;
    },(todoList)=>{
        setLocalStorage(todoList);
    })

    function setTodo(value:string):void {
        //添加一个新的任务
        const todo:ITodo = {
            id:new Date().getTime(),
            content: value,
            status:TODO_STATUS.WANT
        }
        //派发新任务到vuex action
        store.dispatch(SET_TODO,todo)
    }

    function setTodoList() {
        store.dispatch(SET_TODO_LIST,todoList);
    }

    function removeTodo(id:number):void {
        store.dispatch(REMOVE_TODO,id);
    }

    function setStatus(id:number):void {
        store.dispatch(SET_TODO_STATUS,id);
    }

    function setDoing(id:number):void {
        store.dispatch(SET_DOING,id);

    }

    return {
        setTodo,
        setTodoList,
        removeTodo,
        setStatus,
        setDoing,
    }
}

interface IuseLocalStorage{
    getLocalStorage:()=>ITodo[];
    setLocalStorage:(todoList:ITodo[])=>void;
}

function useLocalStorage():IuseLocalStorage {
    function getLocalStorage (): ITodo[] {
        return JSON.parse(localStorage.getItem('todoList')|| '[]') 
    }

    function setLocalStorage(todoList:ITodo[]):void{
        localStorage.setItem('todoList',JSON.stringify(todoList));
    }

    return{
        getLocalStorage,
        setLocalStorage
    }
}

export {
    useTodo
}