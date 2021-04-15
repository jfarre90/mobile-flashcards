import { Action, Dispatch, Store } from 'redux';

const logger = (store: Store) => (next: Dispatch) => (action: Action): any => {
    console.group(action.type);
    console.log('The action: ', action);
    const returnValue = next(action);
    console.log('Then new state is: ', store.getState());
    console.groupEnd();

    return returnValue;
};

export default logger;
