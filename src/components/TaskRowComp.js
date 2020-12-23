import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function TaskRowComp(props) {

    const { taskObject: item } = props;

    function formatDate(dt) {
        let hours = 0;
        let ampm = "am";
        if (dt.getHours() > 12){
            hours = dt.getHours() - 12;
            ampm = "pm";
        } else {
            hours = dt.getHours();
        }
        let formatted = dt.getDate().toString()
            + "-" + dt.getMonth().toString() +
            "-" + dt.getFullYear().toString() +
            " at " + hours.toString() +
            ":" + dt.getMinutes().toString() +
            ":" + dt.getSeconds().toString() + 
            " " + ampm;

        return formatted;
    }

    return (
        <tr>
            <td onClick={() => props.justDisplay(item)}
                style={{ maxWidth: "150px", textAlign: "center", cursor: "pointer" }}
            >
                {item.status === "Completed" ? <del>{item.todo}</del> : item.todo}
            </td>
            <td style={{ cursor: "pointer" }} onClick={() => props.justDisplay(item)}>
                {item.status === "Completed" ? <del>{item.priority}</del> : item.priority}
            </td>
            <td style={{ cursor: "pointer" }} onClick={() => props.justDisplay(item)}>
                {item.status === "Completed" ? <del>{formatDate(item.createdDate)}</del> : formatDate(item.createdDate)}
            </td>
            <td style={{ cursor: "pointer" }} onClick={() => props.justDisplay(item)}>
                {item.status === "Completed"
                    ? <del>{item.dueDate.toString().split("-").reverse().join("-")}</del>
                    : item.dueDate.toString().split("-").reverse().join("-")}
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