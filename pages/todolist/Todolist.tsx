import { useEffect, useState, useContext } from "react";
import { styles, List } from "pages/todolist";
import {
  ListType,
  useTodolistState,
  useTodolistDispatch,
} from "context/todolistContext";

export default function Todolist() {
  const state = useTodolistState();
  const dispatch = useTodolistDispatch();

  const [text, setText] = useState<string>("");

  const handleAddBtn = () => {
    dispatch({
      type: "ADD",
      text: text,
    });
  };

  const handleDelBtn = (id: number) => {
    dispatch({
      type: "DEL",
      id: id,
    });
  };

  const handleDone = (id: number) => {
    dispatch({
      type: "DONE",
      id: id,
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "text") {
      setText(value);
    }
  };

  return (
    <>
      <section>
        <input
          className={styles.input}
          type="text"
          placeholder="할 일을 입력하세요."
          value={text}
          name="text"
          onChange={handleInput}
        />
        <button
          className={styles.addButton}
          type="button"
          onClick={handleAddBtn}
        >
          추가
        </button>
      </section>
      <section>
        <List list={state.list} onDel={handleDelBtn} onDone={handleDone} />
      </section>
    </>
  );
}
