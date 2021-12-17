import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import UsersTable from './components/UsersTable/UsersTable';
import Filter from './components/Filter/Filter';
import Modal from './components/Modal/Modal';
import usersOperations from './redux/users/users-operations';
import {
  getUsersLength,
  getLoading,
} from './redux/users/users-selectors';

import './App.css';

function App() {

  const dispatch = useDispatch();
  const usersQuantity = useSelector(getUsersLength);
  const isLoading = useSelector(getLoading);

  useEffect(() => {
    dispatch(usersOperations.fetchUsers());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Modal isActive={isLoading} />}
      <Container maxWidth="md">
        {(usersQuantity > 0 &&
          <Filter />) || <h1>No users found...</h1>}
        <UsersTable />
      </Container>
    </>
  );
}

export default App;
