// Inbuilt components and modules
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Styles
import "./filter.scss";

function Filter() {
  //Navigate and Location hook
  const navigate = useNavigate();
  const location = useLocation();

  //Url params hook
  const searchParams = new URLSearchParams(location.search);

  //Task filter data state
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  //URL params change handler
  const handleQueryParam = (e) => {
    searchParams.set(e.target.name, e.target.value);
    navigate({ search: searchParams.toString() });
  };

  // Effect to set initial values based on query parameters
  useEffect(() => {
    setFilters({
      title: searchParams.get("title") || "",
      category: searchParams.get("category") || "",
      priority: searchParams.get("priority") || "",
      status: searchParams.get("status") || "",
      dueDate: searchParams.get("dueDate") || "",
    });
  }, [location.search]);

  return (
    <div className="filter">
      <div className="top">
        <div className="item">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={filters.title}
            placeholder="Titles for search"
            onChange={handleQueryParam}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={handleQueryParam}
            value={filters.category}
          >
            <option value="">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            onChange={handleQueryParam}
            value={filters.priority}
          >
            <option value="">Any</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            onChange={handleQueryParam}
            value={filters.status}
          >
            <option value="">Any</option>
            <option value="created">Created</option>
            <option value="in Progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            placeholder="Due Date"
            onChange={handleQueryParam}
            value={filters.dueDate}
          />
        </div>
        <div className="item">
          <button className="btn" onClick={() => navigate({ search: "" })}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
