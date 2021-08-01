import { useState, useEffect } from "react";
import List from "./List/list";
import Input from "./Input/input";
import Footer from "./footer";

const initialList = [
  { todoList: "Learn JavaScript", isCompleted: "completed" },
  { todoList: "Learn React", isCompleted: "" },
  { todoList: "Have a life!", isCompleted: "" },
];

const initialFilters = [
  { filterName: "All", className: "selected" },
  { filterName: "Active", className: "" },
  { filterName: "Completed", className: "" },
];

const todoCounter = (item) => {
  return item.filter((e) => e.isCompleted === "").length;
};
function Todo() {
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) || initialList
  );
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    console.log(list);
  }, [list]);

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <Input setList={setList} list={list} />
        </header>

        <List
          setList={setList}
          list={list}
          setFilters={setFilters}
          filters={filters}
          todoCounter={todoCounter(list)}
        />
      </section>
      <Footer />
    </div>
  );
}

export default Todo;
