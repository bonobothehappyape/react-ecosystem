# Todos

todos is a demo React.js app, demonstrating the basic features and tools for the React ecosystem

## stack

node.js ES6 html5 React.js Redux redux-persist scss

## usage

```javascript
npm
run
dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Redux

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
  that component less reusable from the point of view of the rest of our application. 
  ex. if i want two lists of todos, one for the completed one for noe, i would need to have  parent component connected
  to the store that passes the state to the children components
