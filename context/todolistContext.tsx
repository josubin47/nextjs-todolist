import React, {
  Context,
  createContext,
  useContext,
  Dispatch,
  useReducer,
} from "react";

/*
 * 타입
 */
export type ListType = {
  id: number;
  text: string;
  done: boolean;
};

type TodolistState = {
  list: ListType[];
};

// type TodolistAction = {
//   add: (val: string) => void;
//   del: (id: number) => void;
//   done: (id: number) => void;
// };

type TodolistAction =
  | { type: "ADD"; text: string }
  | { type: "DEL"; id: number }
  | { type: "DONE"; id: number };

type TodolistDispatch = Dispatch<TodolistAction>;

/*
 * 초기값
 */
const initialState: ListType[] = [
  {
    id: 1,
    text: "7시 기상",
    done: true,
  },
  {
    id: 2,
    text: "운동 30분",
    done: false,
  },
  {
    id: 3,
    text: "책 주문",
    done: true,
  },
  {
    id: 4,
    text: "치과 가기",
    done: false,
  },
];

const TodolistStateContext = createContext<TodolistState>(undefined);

const TodolistDispatchContext = createContext<TodolistDispatch>(undefined);

function reducer(state: TodolistState, action: TodolistAction): TodolistState {
  switch (action.type) {
    case "ADD": {
      const nextId = Math.max(...state.list.map((todo) => todo.id)) + 1;
      const newList = [
        ...state.list,
        { id: nextId, text: action.text, done: false },
      ];
      return { ...state, list: newList };
    }
    case "DEL": {
      const newList = state.list.filter(
        (todo: ListType) => todo.id !== action.id
      );
      return { ...state, list: newList };
    }
    case "DONE": {
      const newList = state.list.map((todo: ListType) => {
        return todo.id !== action.id ? todo : { ...todo, done: !todo.done };
      });
      return { ...state, list: newList };
    }
    default:
      throw new Error("Unhandled action");
  }
}

export function TodolistContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { list: initialState });

  return (
    <TodolistStateContext.Provider value={state}>
      <TodolistDispatchContext.Provider value={dispatch}>
        {children}
      </TodolistDispatchContext.Provider>
    </TodolistStateContext.Provider>
  );
}

/*
 * custom hooks
 */
export function useTodolistState() {
  const state = useContext(TodolistStateContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
}

export function useTodolistDispatch() {
  const dispatch = useContext(TodolistDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
}
