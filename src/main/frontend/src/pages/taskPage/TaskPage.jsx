// Inbuilt components and modules
import React, { useEffect, useState } from "react";

// Styles
import "./taskPage.scss";

// Custom components and modules
import Filter from "../../components/containers/filter/Filter";
import TaskCard from "../../components/containers/taskCard/TaskCard";
import TaskForm from "../../components/containers/taskForm/TaskForm";
import TaskView from "../../components/containers/taskView/TaskView";

import useAxios from "./../../hooks/axios";
import UseAuth from "../../hooks/UseAuth";
import { API_URLS } from "../../configs/api.urls";
import { useSearchParams } from "react-router-dom";

const TaskPage = () => {
  //Auth context
  const { auth } = UseAuth();

  //New and edit task form visibility state
  const [newTaskModal, setNewTaskModal] = useState(false);

  // View task modal and Id visibility state
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);

  // Edit task modal visibility state
  const [editTaskId, setEditTaskId] = useState(null);

  // Task data state
  const [taskData, setTaskData] = useState();

  //Axios instance
  const { loading, fetchData } = useAxios();

  //Url params hook
  const [searchParams] = useSearchParams();

  // Fetch tasks data funtion
  const getTasks = async () => {
    // Base URL for get task by userId
    let url = API_URLS.GET_ALL_TASK_BY_USER_URL + `/${auth.userId}`;

    // Convert searchParams to a query string if any parameters exist
    const queryString = searchParams.toString();
    if (queryString) {
      url += `/filter?${queryString}`;
    }

    const response = await fetchData({
      url: url,
      method: "GET",
      requestConfig: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    if (response?.status) {
      return setTaskData(response.data);
    } else {
      return setTaskData(null);
    }
  };

  useEffect(() => {
    getTasks();
  }, [searchParams]);

  return (
    <div className="taskPage">
      <div className="wrapper">
        <div className="topWrapper">
          <h1>{auth.name}'s Tasks</h1>
          <button
            onClick={() => {
              setEditTaskId(null);
              setNewTaskModal(true);
            }}
          >
            + New Task
          </button>
        </div>
        <Filter />
        {loading ? (
          <div className="loading">Loading...</div>
        ) : taskData ? (
          taskData.map((item) => (
            <TaskCard
              key={item.id}
              item={item}
              onOpen={() => setViewTaskModal(true)}
              onEdit={() => setNewTaskModal(true)}
              setViewTaskId={setViewTaskId}
              setEditTaskId={setEditTaskId}
              getTask={getTasks}
            />
          ))
        ) : (
          <div className="noData">No Tasks</div>
        )}
      </div>
      {newTaskModal ? (
        <TaskForm
          open={newTaskModal}
          onClose={() => setNewTaskModal(false)}
          getTask={getTasks}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      ) : (
        ""
      )}
      {viewTaskModal ? (
        <TaskView
          open={viewTaskModal}
          onClose={() => setViewTaskModal(false)}
          viewTaskId={viewTaskId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TaskPage;
