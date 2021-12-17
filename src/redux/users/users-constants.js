const fetchRequest = 'users/FetchRequest';
const fetchSuccess = 'users/FetchSuccess';
const fetchError = 'users/FetchError';

const deleteRequest = 'users/DeleteRequest';
const deleteSuccess = 'users/DeleteSuccess';
const deleteError = 'users/DeleteError';

const addRequest = 'users/AddRequest';
const addSuccess = 'users/AddSuccess';
const addError = 'users/AddError';

const updateRequest = 'users/UpdateRequest';
const updateSuccess = 'users/UpdateSuccess';
const updateError = 'users/UpdateError';

const changeFilter = 'users/ChangeFilter';
const errorRemove = 'users/RemoveError;';
const changeUpdatedUsers = 'users/ChangeUpdatedUsers';
const clearUpdatedUsers = 'users/ClearUpdatedUsers';

const types = {
    deleteError,
    deleteSuccess,
    deleteRequest,
    addRequest,
    addSuccess,
    addError,
    updateRequest,
    updateSuccess,
    updateError,
    changeFilter,
    errorRemove,
    changeUpdatedUsers,
    clearUpdatedUsers,
    fetchRequest,
    fetchSuccess,
    fetchError,
};

export default types;