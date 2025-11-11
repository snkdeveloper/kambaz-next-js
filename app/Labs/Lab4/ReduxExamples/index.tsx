import HelloRedux from "./HelloRedux/HellloRedux";
import CounterRedux from "./CounterRedux/CounterRedux";
import AddRedux from "./AddRedux/AddRedux";
import TodoList from "./todos/TodoList";
export default function ReduxExamples() {
  return (
    <div id="wd-redux-examples">
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
      <TodoList />
    </div>
  );
}