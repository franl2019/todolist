import { IState, ITodo, TODO_STATUS } from "@/types";
import { REMOVE_TODO, SET_DOING, SET_TODO, SET_TODO_LIST, SET_TODO_STATUS } from "./actionTypes";

export default {
    [SET_TODO](state: IState, todo: ITodo): void {
        state.list = [todo, ...state.list]
    },
    [SET_TODO_LIST](state: IState, todoList: ITodo[]): void {
        state.list = todoList
    },
    [REMOVE_TODO](state: IState, id: number): void {
        state.list = state.list.filter((item: ITodo) => item.id !== id);
    },

    [SET_TODO_STATUS](state: IState, id: number): void {
        state.list = state.list.map((item: ITodo) => {
            if (item.id === id) {
                switch (item.status) {
                    case TODO_STATUS.FINISH:
                        item.status = TODO_STATUS.WANT
                        break;
                    case TODO_STATUS.WANT:
                        item.status = TODO_STATUS.FINISH
                        break;
                    case TODO_STATUS.DOING:
                        item.status = TODO_STATUS.FINISH
                        break;
                    default:
                        break;
                }
            }

            return item
        });
    },
    [SET_DOING](state: IState, id: number): void {
        state.list = state.list.map((item: ITodo) => {
            if (item.id === id) {
                switch (item.status) {
                    case TODO_STATUS.DOING:
                        item.status = TODO_STATUS.WANT
                        break;
                    case TODO_STATUS.WANT:
                        item.status = TODO_STATUS.DOING
                        break;
                    default:
                        break;
                }
            } else {
                item.status = TODO_STATUS.WANT
            }

            return item
        })
    },
}