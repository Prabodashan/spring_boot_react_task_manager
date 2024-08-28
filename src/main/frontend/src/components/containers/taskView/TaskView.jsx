// Custom components and modules
import React, { useEffect, useState } from "react";

// Third-party components and modules
import { toast } from "sonner";

// Styles
import "./taskView.scss";

// Custom components and modules
import useAxios from "../../../hooks/axios";
import UseAuth from "../../../hooks/UseAuth";
import { API_URLS } from "../../../configs/api.urls";

const TaskView = ({ open, onClose, viewTaskId }) => {
  //Auth context
  const { auth } = UseAuth();

  //Axios instance
  const { loading, fetchData } = useAxios();

  // Task data state
  const [taskData, setTaskData] = useState();

  // Fetch task data funtion
  const getTaskData = async (e) => {
    const url = API_URLS.GET_TASK_BY_ID_URL + `/${viewTaskId}`;
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

    setTaskData(response.data);
  };

  // close task view function
  const closeModel = () => {
    setTaskData();
    onClose();
  };

  useEffect(() => {
    getTaskData();
  }, [viewTaskId]);

  if (!open) return null;

  return (
    <div onClick={closeModel} className="taskView">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <p className="closeBtn" onClick={onClose}>
          X
        </p>
        <div className="content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="task-title">{taskData?.title}</h1>
              <p className="task-description">{taskData?.description}</p>
              <div className="task-details">
                <div className="detail">
                  <strong>Category:</strong>
                  <span className="category">{taskData?.category}</span>
                </div>
                <div className="detail">
                  <strong>Priority:</strong>
                  <span className="priority">{taskData?.priority}</span>
                </div>
                <div className="detail">
                  <strong>Status:</strong>
                  <span className="status">{taskData?.status}</span>
                </div>
                <div className="detail">
                  <strong>Due Date:</strong>
                  <span className="due-date">{taskData?.dueDate}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskView;
