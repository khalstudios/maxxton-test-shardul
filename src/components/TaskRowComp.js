import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function TaskRowComp(props) {

    const { taskObject: item } = props;

    return (
        <tr key={item.unique}>
            <td onClick={() => props.justDisplay(item)}
                style={{ maxWidth: "150px", textAlign: "center" }}
            >
                {item.status === "Completed" ? <del>{item.todo}</del> : item.todo}
            </td>
            <td>
                {item.status === "Completed" ? <del>{item.priority}</del> : item.priority}
            </td>
            <td>
                {item.status === "Completed" ?
                    <del>{item.createdDate.getDate().toString()
                        + "-" + item.createdDate.getMonth().toString() +
                        "-" + item.createdDate.getFullYear().toString()}</del>
                    : (item.createdDate.getDate().toString()
                        + "-" + item.createdDate.getMonth().toString() +
                        "-" + item.createdDate.getFullYear().toString())}
            </td>
            <td>
                {item.status === "Completed" ? <del>{item.dueDate.toString().split("-").reverse().join("-")}</del> : item.dueDate.toString().split("-").reverse().join("-")}
            </td>
            <td style={{ maxWidth: "150px", textAlign: "center" }}>
                <div className="btn-toolbar row justify-content-center" role="toolbar">
                    <button onClick={() => props.handleEdit(item)} className="btn btn-primary mx-1"><FaEdit /></button>
                    <button onClick={() => props.markComplete(item)} className={item.status === "Completed" ? "btn btn-primary mx-2" : "btn btn-success mx-1"}>{item.status === "Completed" ? "Re-Open" : "Done"}</button>
                    <button onClick={() => props.handleDelete(item)} className="ms-1 btn btn-danger mx-1"><FaTrashAlt /></button>
                </div>
            </td>
        </tr>
    );
}

export default TaskRowComp;