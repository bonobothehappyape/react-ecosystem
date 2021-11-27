# Todos

todos is a demo React.js app, demonstrating the basic features and tools for the React ecosystem

## stack

node.js ES6 html5 React.js Redux redux-persist scss

## usage

```javascript
npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Redux

Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as
a centralized store for state that needs to be used across your entire application, with rules ensuring that the state
can only be updated in a predictable fashion.

#### The Redux Store

The center of every Redux application is the store. A "store" is a container that holds your application's global state.
A store is a JavaScript object with a few special functions and abilities that make it different than a plain global
object:

You must never directly modify or change the state that is kept inside the Redux store Instead, the only way to cause an
update to the state is to create a plain **action** object that describes _"something that happened in the application"_
, and then **dispatch the action to the store** to tell it what happened. When an action is dispatched, the store runs
the root reducer function, and lets it **calculate the new state based on the old state and the action**. Finally, the
store **notifies subscribers** that the state has been updated, so the UI can be updated with the new data.

#### Redux Reducers

Reducers are functions. The reducer receives two arguments, the current `state` and an `action` object describing what
happened.

```javascript
// Create a "reducer" function that determines what the new state
// should be when something happens in the app
function counterReducer(state = initialState, action) {
    // Reducers usually look at the type of action that happened
    // to decide how to update the state
    switch (action.type) {
        case 'counter/incremented':
            return {...state, value: state.value + 1}
        case 'counter/decremented':
            return {...state, value: state.value - 1}
        default:
            // If the reducer doesn't care about this action type,
            // return the existing state unchanged
            return state
    }
}
```

#### Store

```javascript
// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = Redux.createStore(counterReducer)
````

#### UI

In any application, the user interface will show existing state on screen. When a user does something, the app will
update its data and then redraw the UI with those values.

```javascript
// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById('value')

// Whenever the store state changes, update the UI by
// reading the latest store state and showing new data
function render() {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// Update the UI with the initial data
render()
// And subscribe to redraw whenever the data changes in the future
store.subscribe(render)
````

#### Actions

We need to respond to user input by creating action objects that describe what happened, and dispatching them to the
store. When we call store.dispatch(action), the store runs the reducer, calculates the updated state, and runs the
subscribers to update the UI.

```javascript
// Handle user inputs by "dispatching" action objects,
// which should describe "what happened" in the app
document.getElementById('increment').addEventListener('click', function () {
    store.dispatch({type: 'counter/incremented'})
})

document.getElementById('decrement').addEventListener('click', function () {
    store.dispatch({type: 'counter/decremented'})
})

document
    .getElementById('incrementIfOdd')
    .addEventListener('click', function () {
        // We can write logic to decide what to do based on the state
        if (store.getState().value % 2 !== 0) {
            store.dispatch({type: 'counter/incremented'})
        }
    })

document
    .getElementById('incrementAsync')
    .addEventListener('click', function () {
        // We can also write async logic that interacts with the store
        setTimeout(function () {
            store.dispatch({type: 'counter/incremented'})
        }, 1000)
    })
````

#### Data Flow

https://redux.js.org/tutorials/fundamentals/part-1-overview#data-flow

#### Selectors

A "selector function" is any function that accepts the Redux store state (or part of the state) as an argument, and
returns data that is based on that state. A selector function can have any name you want. However, we recommend
prefixing selector function names with the word select combined with a description of the value being selected. Typical
examples of this would look like selectTodoById, selectFilteredTodos, and selectVisibleTodos.

```javascript
// Arrow function, direct lookup
const selectEntities = state => state.entities

// Function declaration, mapping over an array to derive values
function selectItemIds(state) {
    return state.items.map(item => item.id)
}

// Function declaration, encapsulating a deep lookup
function selectSomeSpecificField(state) {
    return state.some.deeply.nested.field
}

// Arrow function, deriving values from an array
const selectItemsWhoseNamesStartWith = (items, namePrefix) =>
    items.filter(item => item.name.startsWith(namePrefix))
````

#### Memoization

Memoization is a form of _**caching**_. It involves tracking inputs to a function, and storing the inputs and the
results for later reference. If a function is called with the same inputs as before, the function can skip doing the
actual work, and return the same result it generated the last time it received those input values.

The Redux ecosystem has traditionally used a library called [Reselect](https://github.com/reduxjs/reselect) to create
memoized selector functions.

### Redux best practices

* When you connect components to the Redux store, your file should export both the unconnected and connected versions of
  that component. The reason for this is that the connected version of your component is usually what the rest of the
  application will want to use.

* When testing your component, which is something I highly recommend, by the way, it'll make your life a lot easier if
  you can simply test your component as is without having to create and set up a fake store in order to see how your
  component behaves under different circumstances.

* You should never trigger any other actions from inside your reducers or perform any kind of asynchronous operations
  such as fetching data from the network. reducers are specifically meant to take the current state of the Redux store
  and combine it with an action to get the updated state

* We need to put some thought into which components we connect to the Redux store in our application. To be a little
  more specific here, we need to realize that connecting a given component to the Redux store has the potential to make
  that component less reusable from the point of view of the rest of our application. ex. if i want two lists of todos,
  one for the completed one for noe, i would need to have parent component connected to the store that passes the state
  to the children components

[]: https://github.com/reduxjs/reselect
