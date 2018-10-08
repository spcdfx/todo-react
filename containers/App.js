import React, {Component} from 'react';

const Title = ({todoCount}) => {
	return (
		<div>
			<div>
				<h1>To-do ({todoCount}) </h1>
			</div>
		</div>
	);
}
const TodoForm = ({ addTodo, handleKeyPress }) => {
	//Input Tracker
	let input;
	// Render the component.
	return (
		<div>
			<input placeholder="Write a todo here..." ref={node => {
				input = node;
			}}/>
			<button onClick={() => {
				addTodo(input.value);
				input.value = '';
			}}>
				+
			</button>
		</div>
	);
};

const Todo = ({ todo, remove }) => {
	// Each todo
	return (<li onClick={() => {
		remove(todo.id);
	}}>{todo.text}</li>);
}

const ToDoList = ({ todos, remove }) => {
	// Map through the todos
	const todoNode = todos.map((todo) => {
		return (<Todo todo={todo} key={todo.id} remove={remove} />)
	});
	return (<ul>{todoNode}</ul>);
}

// Container Component
// Todo ID
window.id = 0;
export default class TodoApp extends Component {
	constructor(props) {
		// Pass props to parent class
		super(props);
		// Set initial state
		this.state = {
			data: []
		}
		this.apiUrl = 'https://5bba77f5ba8cc7001329d27e.mockapi.io/todo'
	}
	// Lifecylce method
	componentDidMount() {
		// Make HTTP request with Axios
		axios.get(this.apiUrl)
			.then((res) => {
				// Set state with result
				this.setState({ data: res.data });
			});
	}
	// Add todo handler
	addTodo(val) {
		// Assemble Data
		const todo = { text: val, id: window.id++ }
		// Update data
		axios.post(this.apiUrl, todo)
			.then((res) => {
				this.state.data.push(res.data);
				this.setState({ data: this.state.data });
			});
	}
	// Handle remove
	handleRemove(id) {
		// Filter all todos except the one to be removed
		const remainder = this.state.data.filter((todo) => {
			if (todo.id !== id) return todo;
		});
		// Update state with filter
		axios.delete(this.apiUrl + '/' + id)
			.then((res) => {
				this.setState({ data: remainder });
			})
	}

	render() {
		// Render JSX
		return (
			<div>
				<Title todoCount={this.state.data.length}/>
				<TodoForm addTodo={this.addTodo.bind(this)} />
				<ToDoList
					todos={this.state.data}
					remove={this.handleRemove.bind(this)}
				/>
			</div>
		);
	}
}