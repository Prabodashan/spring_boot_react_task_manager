// Inbuilt components and modules
import React, { useEffect, useState } from "react";

// Styles
import "./taskForm.scss";

// Third-party components and modules
import { toast } from "sonner";

// Custom components and modules
import useAxios from "../../../hooks/axios";
import UseAuth from "../../../hooks/UseAuth";
import { API_URLS } from "../../../configs/api.urls";

const TaskForm = ({
  open,
  onClose,
  getTask,
  editTaskId = null,
  setEditTaskId,
}) => {
  //Axios instance
  const { loading, fetchData } = useAxios();

  //Auth context
  const { auth } = UseAuth();

  // Task Form data state
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "work",
    priority: "low",
    dueDate: "",
    status: "created",
    userId: auth.userId,
  });

  // Task form error state
  const [err, setError] = useState(null);

  //Task form data change handler
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Task form data validate function
  const validate = (values) => {
    const errors = {};
    setError(null);

    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.category) {
      errors.category = "Category is required!";
    }
    if (!values.priority) {
      errors.priority = "Priority is required!";
    }
    if (!values.dueDate) {
      errors.dueDate = "Due Date is required!";
    }
    if (!values.status) {
      errors.status = "Status is required!";
    }
    return errors;
  };

  // Task form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorVal = validate(inputs);
    if (Object.keys(errorVal).length !== 0) {
      setError(errorVal);
      return;
    }

    // If this form use to create then set create URL else set update URL
    const url =
      editTaskId != null
        ? API_URLS.UPDATE_TASK_BY_ID_URL + `/${editTaskId}`
        : API_URLS.CREATE_TASK_URL;
    const response = await fetchData({
      url: url,
      method: editTaskId != null ? "PUT" : "POST",
      data: inputs,
      requestConfig: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (!response?.status) {
      return setError(response.data);
    }

    toast.success(response.message);
    closeModel();
    getTask();
  };

  // Fetch task data funtion
  const getTaskData = async (e) => {
    const url = API_URLS.GET_TASK_BY_ID_URL + `/${editTaskId}`;
    const response = await fetchData({
      url: url,
      method: "GET",
      requestConfig: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (!response?.status) {
      return toast.error(response.message);
    }

    setInputs(response.data);
  };

  useEffect(() => {
    if (editTaskId != null) {
      getTaskData();
    } else {
      setInputs({
        title: "",
        description: "",
        category: "work",
        priority: "low",
        dueDate: "",
        status: "created",
        userId: auth.userId,
      });
    }
  }, [editTaskId, auth.userId]);

  // Close task form function
  const closeModel = () => {
    setInputs({
      title: "",
      description: "",
      category: "work",
      priority: "low",
      dueDate: "",
      status: "created",
      userId: auth.userId,
    });
    setError(null);
    setEditTaskId(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div onClick={closeModel} className="taskForm">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <p className="closeBtn" onClick={closeModel}>
          X
        </p>
        <div className="content">
          <form>
            <h1>{editTaskId != null ? "Update Task" : "Create New Task"}</h1>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                placeholder="Title"
                value={inputs.title}
                onChange={handleChange}
              />
              {err?.title ? (
                <span data-testid="titleError" className="errorSpan">
                  {err.title}
                </span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="item">
              <label htmlFor="description">Description</label>
              <input
                name="description"
                type="text"
                placeholder="Description"
                onChange={handleChange}
                value={inputs.description}
              />
              {err?.description ? (
                <span className="errorSpan">{err.description}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="item">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="categoy"
                onChange={handleChange}
                value={inputs.category}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="study">Study</option>
              </select>
              {err?.category ? (
                <span className="errorSpan">{err.category}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="item">
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                id="priority"
                onChange={handleChange}
                value={inputs.priority}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {err?.priority ? (
                <span className="errorSpan">{err.priority}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="item">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                onChange={handleChange}
                value={inputs.status}
              >
                <option value="created">Created</option>
                <option value="in Progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="closed">Closed</option>
              </select>
              {err?.status ? (
                <span className="errorSpan">{err.status}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <div className="item">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                placeholder="Due Date"
                onChange={handleChange}
                value={inputs.dueDate}
              />
              {err?.dueDate ? (
                <span className="errorSpan">{err.dueDate}</span>
              ) : (
                <p>
                  <br />
                </p>
              )}
            </div>
            <button className="btn" onClick={handleSubmit} disabled={loading}>
              {editTaskId != null ? "Update" : "Create"}
            </button>

            <div className="item">
              <p>
                <br />
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
