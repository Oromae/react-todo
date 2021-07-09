import { useState } from "react";
import List from "./List/list";
import Input from "./Input/input";
import Footer from "./footer";
const initiallist = [
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
  const [list, setList] = useState(initiallist);
  const [filters, setFilters] = useState(initialFilters);

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
