interface ITodo {
    id: number;
    content: string;
    status: TODO_STATUS
}

interface IState {
    list: ITodo[]
}

enum TODO_STATUS {
    WANT = 'want',
    DOING = 'doing',
    FINISH = 'findsh'
}

export {
    ITodo,
    IState,
    TODO_STATUS
}