import { USER_ID } from './api/todos';
import { Todos } from './components/Todo/Todos';
import { TodosProvider } from './context/TodosProvider';
import { UserWarning } from './UserWarning';

export const App = () =>
  !USER_ID ?
    <UserWarning />
  : <TodosProvider>
      <Todos />
    </TodosProvider>;
