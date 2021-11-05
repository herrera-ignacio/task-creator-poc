export const initialState = {
	tasks: {},
}

const TASK_SAVE = 'TASK_SAVE';

export const taskSaveAction = (task = { name: '', seconds: 0}) => ({
	type: TASK_SAVE,
	task,
});

export default function tasksReducer(state = initialState, action) {
	switch(action.type) {
		case TASK_SAVE:
			const { task } = action;
			const taskId = Object.keys(state.tasks).length + 1;
			return {
				...state,
				tasks: {
					...state.tasks,
					[taskId]: { ...task, id: taskId },
				}
			};
		default:
			return state;
	}
}
