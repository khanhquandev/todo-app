import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem/TodoItem";
import Sidebar from "./components/Sidebar/Sidebar";
import FilterPanel from "./components/FilterPanel/FilterPanel";

function App() {
  const [todoList, setToDoList] = useState([]);
  const [todo, setToDo] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);
  const handleCompleteCheckBox = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setToDoList(newTodoList);
  };
  const handleSidebar = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };
  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setToDoList(newTodoList);
  };
  const inputRef = useRef();
  const todos =
    todoList &&
    todoList
      .filter((todo) => {
        if (!todo.name.includes(searchText)) {
          return false;
        }
        switch (selectedFilterId) {
          case "all":
            return true;
          case "important":
            return todo.isImportant;
          case "completed":
            return todo.isCompleted;
          case "deleted":
            return todo.deleted;
          default:
            return true;
        }
      })
      .map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            name={todo.name}
            isImportant={todo.isImportant}
            isCompleted={todo.isCompleted}
            handleCompleteCheckBox={handleCompleteCheckBox}
            handleTodoItemClick={handleSidebar}
          ></TodoItem>
        );
      });
  const addWork = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      todoList &&
        setToDoList([
          ...todoList,
          {
            id: todoList.length + 1,
            name: value,
            isImportant: false,
            isCompleted: false,
            isDeleted: false,
          },
        ]);
      inputRef.current.value = "";
    }
  };
  const addWorkByButton = (todo) => {
    todoList &&
      setToDoList([
        ...todoList,
        {
          id: todoList.length + 1,
          name: todo.map((item) => {
            return item.name;
          }),
          isImportant: false,
          isCompleted: false,
          isDeleted: false,
        },
      ]);
    inputRef.current.value = "";
  };
  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
        setQuantity={todoList}
        searchText={searchText}
        setSearchText={setSearchText}
      ></FilterPanel>
      <div className="main-content">
        <div style={{ padding: 0 }}>
          <div className="add-task">
            <input
              ref={inputRef}
              type="text"
              name="add-new-task"
              placeholder="Input a new task"
              className="task-input"
              onKeyDown={(event) => addWork(event)}
              onChange={(event) =>
                setToDo([
                  {
                    id: todoList.length + 1,
                    name: event.target.value,
                    isImportant: false,
                    isCompleted: false,
                    isDeleted: false,
                  },
                ])
              }
            />
            <button onClick={() => addWorkByButton(todo)}>Add</button>
          </div>
        </div>
        <div>{todos}</div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          ></Sidebar>
        )}
      </div>
    </div>
  );
}

export default App;
