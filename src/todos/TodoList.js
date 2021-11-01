import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import {loadTodos} from './thunks';
import {removeTodo, markTodoAsCompleted} from './actions';
import './TodoList.css';

// component properties
const TodoList = ({todos = [],
                      onRemovePressed,
                      onCompletedPressed,
                      isLoading,
                      startLoadingTodos}) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <div className="list-wrapper">
            <NewTodoForm/>
            {todos.map(todo => <TodoListItem
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );
    return isLoading ? loadingMessage : content;
};

// maps state to properties
const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
});

// maps events to actions
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
});

// connect component to redux
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
