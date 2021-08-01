import { useState } from "react";

function List({ setList, list, setFilters, filters, todoCounter }) {
  const [editTodo, setEditTodo] = useState(-1);
  const [test, setTest] = useState("All");

  const filtered = list.filter((item) => {
    if (test === "All") {
      return true;
    } else if (test === "Active") {
      return item.isCompleted === false;
    } else if (test === "Completed") {
      return item.isCompleted === true;
    }
  });

  const toggleTodo = (i) => {
    updateTodo({ isCompleted: filtered[i].isCompleted ? false : true }, i);
  };

  const updateTodo = (isComp, i) => {
    let todoList = [...filtered];
    let todo = todoList[i];
    todoList[i] = { ...todo, ...isComp };
    setList(todoList);
  };

  const destroyer = (i) => {
    const remainingTasks = list.filter((task, e) => {
      if (test === "All") {
        return i !== e;
      } else {
        return filtered[i].todoList !== task.todoList;
      }
    });
    setList(remainingTasks);
  };

  const onBlur = (e, i) => {
    setEditTodo(-1);
    if (e.target.value === "") {
      return false;
    }

    updateTodo({ todoList: e.target.value }, i);
  };

  const onClickTodo = (i) => {
    setEditTodo(i);
  };

  function onClear() {
    const filterCompleted = list.filter((item) => item.isCompleted !== true);
    setList(filterCompleted);
  }
  function onClickFilter(i) {
    if (filters[i].className === "selected") {
      return false;
    }

    updateFilter({ className: filters[i].className ? "" : "selected" }, i);

    setTest(filters[i].filterName);
  }

  const updateFilter = (filter, i) => {
    let filterList = [...filters];
    let filtered = filterList[i];
    filterList[i] = { ...filtered, ...filter };

    defaultFilter();
    setFilters(filterList);
  };

  const defaultFilter = () => {
    filters.map((item) => {
      if (item.className !== "") {
        setFilters((item.className = ""));
      }
    });
  };

  return (
    <div>
      <ul className="todo-list">
        {filtered.map((item, i) => (
          <li key={i} className={item.isCompleted ? "completed" : ""}>
            <div className="view">
              <input
                key={i}
                onChange={() => toggleTodo(i)}
                className="toggle"
                type="checkbox"
                checked={item.isCompleted}
              />

              {editTodo === i ? (
                <input
                  defaultValue={item.todoList}
                  className="new-todo"
                  autoFocus
                  onBlur={(e) => onBlur(e, i)}
                />
              ) : (
                <>
                  <label onClick={() => onClickTodo(i)}>{item.todoList}</label>
                  <button
                    className="destroy"
                    onClick={() => destroyer(i)}
                  ></button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todoCounter}</strong> items left
        </span>

        <ul className="filters">
          {filters.map((item, i) => (
            <li key={i}>
              <a onClick={() => onClickFilter(i)} className={item.className}>
                {item.filterName}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={onClear} className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default List;
