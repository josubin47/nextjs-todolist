import { useEffect, useState, useContext } from "react";
import styles from "./todolist.module.css";
import {
  ListType,
  TodolistContextProvider,
  useTodolistState,
  useTodolistDispatch,
} from "context/todolistContext";

type ListProps = {
  list: ListType[];
  onDel: (id: number) => void;
  onDone: (id: number) => void;
};

export default function List({ list, onDel, onDone }: ListProps) {
  return (
    <ul className={styles.ul}>
      {list.map((item, index) => (
        <>
          <li
            className={(styles.li, item.done ? styles.checked : "")}
            key={item.id}
            onClick={() => onDone(item.id)}
          >
            {item.text}
            <button
              className={styles.delButton}
              type="button"
              onClick={() => onDel(item.id)}
            >
              X
            </button>
          </li>
        </>
      ))}
      {/* <li className="checked">Pay bills</li> */}
    </ul>
  );
}
