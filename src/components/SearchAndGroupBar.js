import React from "react";

function SearchAndGroupBar(props) {
    return (
        <div className="row">
            <div className="col-md-3">
                <div className="form-group">
                    <label className="form-label" style={{ float: "left" }} htmlFor="prioritySelect"><b>Group By</b></label>
                    <select className="form-control" id="prioritySelect" value={props.priority} onChange={() => ""}>
                        <option value="none">Not Implemented</option>
                    </select>
                </div>
            </div>
            <div className="col-md-9">
                <div className="form-group">
                    <label className="form-label" style={{ float: "left" }} htmlFor="searchFilter"><b>Search</b></label>
                    <input
                        maxLength="140"
                        className="form-control"
                        id="searchFilter"
                        type="text"
                        value={props.searchFilterText}
                        placeholder="Please enter task title..."
                        onChange={props.filterTasks}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchAndGroupBar;