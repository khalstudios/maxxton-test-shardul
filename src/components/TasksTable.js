import React from 'react';

function TasksTable(props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={() => props.handleTextSort("todo")} scope="col">
                        Summary {props.renderSortIcon("todo")}
                    </th>
                    <th onClick={() => props.handleTextSort("priority")} scope="col">
                        Priority {props.renderSortIcon("priority")}
                    </th>
                    <th onClick={() => props.handleDateSort("createdDate")} scope="col">
                        Created On {props.renderSortIcon("createdDate")}
                    </th>
                    <th onClick={() => props.handleDateSort("dueDate")} scope="col">
                        Due Date {props.renderSortIcon("dueDate")}
                    </th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.displayTaskList}
            </tbody>
        </table>
    );
}

export default TasksTable;