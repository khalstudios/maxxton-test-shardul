import React, { Component } from "react";

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {...props.toDoObj, errors: {}};
        this.constructToDoObj = this.constructToDoObj.bind(this);
    }

    constructToDoObj() {
        const errors = this.validate();
        if (errors) {
            this.setState({errors});
        } else {
            if(this.props.modalAction === "new") {
                this.setState({ unique: new Date().getTime(), createdDate: new Date() }, () => this.props.addTodo(this.state));        
            } else {
                this.props.addTodo(this.state);
            }
        }
    }

    validate = () => {
        const { todo, summary, dueDate } = this.state;
        let errors = {};
        if (todo === "" || todo.length < 10)
            errors.todo = "Title is required and should be minimum of 10 characters.";
        if (summary === "" || summary.length < 10)
            errors.summary = "Description is required and should be minimum of 10 characters.";
        if (dueDate === "" || dueDate.length < 10)
            errors.dueDate = "Due date is reuired.";

        return Object.keys(errors).length === 0 ? null : errors;
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <h3>Please enter a task</h3>
                <hr></hr>
                <form onSubmit={this.constructToDoObj}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="toDoInput">Title</label>
                        <input
                            minLength="10"
                            maxLength="140"
                            disabled={this.props.shouldDisable}
                            className="form-control"
                            id="toDoInput"
                            type="text"
                            value={this.state.todo}
                            placeholder="Please enter to-do item (max 140 characters)"
                            onChange={(e) => this.setState({ todo: e.target.value })}
                        />
                        {errors.todo && <div className="alert alert-danger">{errors.todo}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="summaryText">Description</label>
                        <textarea
                            minLength="10"
                            maxLength="500"
                            disabled={this.props.shouldDisable}
                            className="form-control"
                            id="summaryText"
                            value={this.state.summary}
                            placeholder="Please enter to-do item description (max 500 characters)"
                            onChange={(e) => this.setState({ summary: e.target.value })}
                        >
                        </textarea>
                        {errors.summary && <div className="alert alert-danger">{errors.summary}</div>}
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="dueDateInput">Due Date</label>
                            <input
                                disabled={this.props.shouldDisable}
                                className="form-control"
                                id="dueDateInput"
                                value={this.state.dueDate}
                                type="date"
                                onChange={(e) => this.setState({ dueDate: e.target.value })}
                            />
                            {errors.dueDate && <div className="alert alert-danger">{errors.dueDate}</div>}
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="prioritySelect">Priority</label>
                            <select disabled={this.props.shouldDisable} className="form-control" id="prioritySelect" value={this.state.priority} onChange={(e) => this.setState({ priority: e.target.value })}>
                                <option value="none">None</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </form>

                <div>
                    <div className="form-group">
                        {!this.props.shouldDisable && <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.constructToDoObj}
                            style={
                                {
                                    float: "right"
                                }
                            }
                        >
                            Save Task
                        </button>}
                        <button
                            className="btn btn-danger"
                            onClick={() => this.props.closeModal(false)}
                            style={
                                {
                                    float: "left"
                                }
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        );
    }

}

export default TodoItem;
