import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Button,
  List,
  ListItem,
  IconButton,
  TextField,
  Divider,
  Checkbox,
} from "@mui/material";
import styled from "styled-components";
import { Delete, Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";

const apiURL = "http://localhost:4000/todo";

export const TodoList = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, formState, reset, getValues } = useForm();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [active, setActive] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    setIsEdit(false);
  }, []);
  const fetchTodos = async () => {
    try {
      const response = await axios.get(apiURL);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
    initialData: [],
  });

  const addMutation = useMutation({
    mutationFn: (data) => addTodos(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
      setTitle("");
      setBody("");
    },
  });
  const editMutation = useMutation({
    mutationFn: (data) => editTodo(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      reset();
      setTitle("");
      setBody("");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  const updateCheckedMutation = useMutation({
    mutationFn: (data) => updateCheckedTodo(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onAdd = () => {
    const data = { title, body, active };
    addMutation.mutate(data);
  };

  const onEdit = () => {
    const data = { id: selectedTodo.id, title, body, active };
    editMutation.mutate(data);
  };

  const handleEditTodo = (todo) => {
    setIsEdit(true);
    setSelectedTodo(todo);
    const { title, body } = todo;
    setTitle(title);
    setBody(body);
  };

  const handleDeleteTodo = (id) => {
    deleteMutation.mutate(id);
  };

  const handleCheckTodo = (id, checked) => {
    const data = { id: id, active: checked };
    updateCheckedMutation.mutate(data);
  };

  const addTodos = async (data) => {
    const response = await axios.post(apiURL, data);
    return response.data;
  };
  const editTodo = async (data) => {
    const response = await axios.put(apiURL, data);
    return response.data;
  };
  const deleteTodo = async (data) => {
    const response = await axios.delete(`${apiURL}/${data.id}`);
    return response.data;
  };
  const updateCheckedTodo = async (data) => {
    const response = await axios.put(`${apiURL}/updateCheck/${data.id}`, data);
    return response.data;
  };

  return (
    <Container>
      <div className="todolist_wrapper">
        <div className="border_box">
          <List dense className="todo_ul">
            {todos.map((item, index) => (
              <>
                {index !== 0 && <Divider />}
                <ListItem
                  key={item.id}
                  className={` ${item.active ? "disabled" : ""}`}
                  secondaryAction={
                    <div style={{ display: "flex", gap: "4px" }}>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditTodo(item)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteTodo(item)}>
                        <Delete />
                      </IconButton>
                    </div>
                  }>
                  <Checkbox
                    checked={item.active}
                    onChange={(e) => handleCheckTodo(item.id, e.target.checked)}
                  />
                  <div className={`contents_wrapper`}>
                    <div className="todo_title">{item.title}</div>
                    <div className="todo_body">{item.body}</div>
                  </div>
                </ListItem>
              </>
            ))}
          </List>
        </div>
        <div className="border_box" style={{ maxWidth: "50vw" }}>
          <form className="form_wrapper">
            <TextField
              id="standard-basic"
              label="title"
              variant="standard"
              value={title}
              onChange={(e) => {
                setValue("title", e.target.value, {
                  shouldValidate: true,
                });
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="body"
              variant="standard"
              value={body}
              onChange={(e) => {
                setValue("body", e.target.value, {
                  shouldValidate: true,
                });
                setBody(e.target.value);
              }}
            />
            <div className="button_wrapper">
              <Button
                variant="outlined"
                onClick={(e) => {
                  if (isEdit) {
                    onEdit();
                  } else {
                    onAdd();
                  }
                }}>
                {isEdit ? "수정" : "추가"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;

  .todolist_wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    justify-content: center;
    gap: 24px;

    .border_box {
      border: 1px solid rgba(25, 118, 210, 0.5);
      border-radius: 24px;
    }

    .todo_ul {
      li {
        &.disabled {
          opacity: 50%;
        }
      }
    }
    .contents_wrapper {
      margin-left: 8px;
      &.disabled {
        .todo_title,
        .todo_body {
          color: gray;
        }
      }
      .todo_title {
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: #221c15;
      }
      .todo_body {
        font-size: 14px;
        line-height: 20px;
        color: #454441;
      }
    }
    .form_wrapper {
      padding: 24px;
      display: flex;
      flex-direction: column;
    }
  }
  .button_wrapper {
    display: flex;
    justify-content: end;
    padding: 16px 0;
  }
`;
