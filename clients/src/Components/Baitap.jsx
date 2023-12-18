// Import thêm useRef từ React
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Baitap() {
  const [todo, setTodo] = useState({
    name: "",
  });
  const [allTodo, setAllTodo] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberTodos, setNumberTodos] = useState(0);
  const inputRef = useRef(null);
  const handleGetTodo = async () => {
    setLoading(true);
    const itemPerPage = 5;
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/todo?per_page=${itemPerPage}`
      );
      const completdTodo = response.data.filter((e) => !e.completed);
      setNumberTodos(completdTodo.length);
      setAllTodo(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    handleGetTodo();
  }, [flag]);

  const handleAddTodo = async () => {
    try {
      await axios.post("http://localhost:8000/api/v1/todo", {
        ...todo,
        id: Math.floor(Math.random() * 9999999999),
        completed: false,
      });

      setFlag(!flag);
      setTodo({
        name: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const handleEdit = async (item) => {
    setTodo(item);
    setIsEdit(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/todo/${todo.id}`, todo);
      setFlag(!flag);
      setTodo({
        name: "",
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleChangeCompleted = async (item) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/todo/${item.id}`, item);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todo/${id}`);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todo`);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  };

  // Nghe sự kiện keydown trên input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="h-[700px] w-[100%] flex bg-gradient-to-b from-custom-200 to-custom-100">
      <div className="bg-custom-50 w-[25%] m-auto h-[600px] items-center rounded-lg ">
        <div className="h-[70px] flex items-center w-[90%] m-auto">
          <h1 className="text-3xl font-bold">Todo App</h1>
        </div>
        <div className="w-[90%] m-auto flex">
          <input
            ref={inputRef}
            type="text"
            className="w-[300px] h-[50px] block mr-3 pl-5"
            placeholder="ADD YOUR NEW TODO"
            name="name"
            onChange={(e) =>
              setTodo({ ...todo, [e.target.name]: e.target.value })
            }
            value={todo.name}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-custom-100 w-[50px] h-[50px] rounded block"
            onClick={isEdit ? handleSave : handleAddTodo}
          >
            {isEdit ? (
              <i className="fa-solid fa-floppy-disk"></i>
            ) : (
              <i className="fa-solid fa-plus text-white"></i>
            )}
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {allTodo.map((item, index) => (
              <div
                className="mt-5 w-[90%] m-auto text-2xl font-bold bg-zinc-300 h-[50px] flex items-center justify-between"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChangeCompleted(item);
                }}
                key={index}
              >
                <p
                  className="ml-5"
                  style={{
                    textDecoration: item.completed ? "line-through" : "",
                  }}
                >
                  {item.name}
                </p>
                <div className="hidden">
                  <button
                    className="bg-red-500 h-[50px] w-[50px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                  >
                    <i className="fa-solid fa-pen-nib"></i>
                  </button>
                  <button
                    className="bg-red-500 h-[50px] w-[50px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                  >
                    <i className="fa-solid fa-recycle"></i>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        <div className="flex justify-between w-[90%] m-auto pt-5">
          <p className=" text-2xl flex items-center">
            You have {numberTodos} pending task
          </p>
          <button
            className="block bg-red-500 w-[50px] h-[50px]"
            onClick={handleDeleteAll}
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
