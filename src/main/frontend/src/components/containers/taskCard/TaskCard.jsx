// Inbuilt components and modules
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./taskCard.scss";

// Third-party components and modules
import { confirmAlert } from "react-confirm-alert"; // Import confirm alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css confirm alert
import { toast } from "sonner";

// Custom components and modules
import UseAuth from "./../../../hooks/UseAuth";
import useAxios from "./../../../hooks/axios";
import { API_URLS } from "../../../configs/api.urls";

// Custom SVG
import View from "../../../assets/svg/view.svg";
import Edit from "../../../assets/svg/edit.svg";
import Delete from "../../../assets/svg/delete.svg";

const TaskCard = ({
  item,
  onOpen,
  onEdit,
  setViewTaskId,
  setEditTaskId,
  getTask,
}) => {
  //Auth context
  const { auth } = UseAuth();

  //Axios instance
  const { fetchData } = useAxios();

  // Task delete confirm dialog
  const handleDelete = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete task.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            //Task delete function
            const response = await fetchData({
              url: API_URLS.DELETE_TASK_BY_ID_URL + `/${item.id}`,
              method: "DELETE",
              requestConfig: {
                Authorization: `Bearer ${auth.token}`,
              },
            });
            if (!response.status) {
              return toast.error(response.message);
            }
            toast.success(response.message);
            getTask();
          },
        },
        {
          label: "No",
          onClick: () => {
            return;
          },
        },
      ],
    });
  };

  // Truncate function to limit text length
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div className="taskCard">
      <div className="left">
        <div className="textContainer">
          <h2 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>
          <p className="description">{truncateText(item.description, 50)}</p>
          <div className="bottom">
            <div className="features">
              <p className="feature">Due Date : {item.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="middle">
        <p>Category</p>
        <span>{item.category}</span>
      </div>
      <div className="middle">
        <p>Priority</p>
        <span className={`${item.priority}`}>{item.priority}</span>
      </div>
      <div className="middle">
        <p>Status</p>
        <span className={`${item.status}`}>{item.status}</span>
      </div>
      <div className="right">
        <button
          className="btn viewButton"
          onClick={() => {
            setViewTaskId(item.id);
            onOpen();
          }}
        >
          <img src={View} alt="view" />
        </button>
        <button
          className="btn editButton"
          onClick={() => {
            setEditTaskId(item.id);
            onEdit();
          }}
        >
          <img src={Edit} alt="edit" />
        </button>
        <button className="btn deleteButton" onClick={handleDelete}>
          <img src={Delete} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
