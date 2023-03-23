import { applyPagination } from 'src/utils/apply-pagination';
import { useGetAllUsersQuery } from './apiUser';

export const UsersApi = (request = {}) => {
  const { filters, page, rowsPerPage } = request;
  const { data: users, isSuccess: isSuccessUsers, isError: IsErrorUsers, error: errorUsers } = useGetAllUsersQuery()
  let data = {}
  let count = 0

  if (isSuccessUsers && users?.success) {
    data = users.result
    count = users.totalUsers

    if (typeof filters !== 'undefined') {
      const dataFiltered = data?.result.filter((user) => {
        if (typeof filters.user !== 'undefined' && filters.user !== '') {
          const nameMatched = user.user.toLowerCase().includes(filters.user.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // It is possible to select multiple type options
        if (typeof filters.type !== 'undefined' && filters.type.length > 0) {
          const typeMatched = filters.type.includes(user.type);

          if (!typeMatched) {
            return false;
          }
        }

        // It is possible to select multiple status options
        if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
          const statusMatched = filters.status.includes(user.status);

          if (!statusMatched) {
            return false;
          }
        }

        return true;
      });
      count = dataFiltered.length
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }
  }

  if (IsErrorUsers) {
    console.log("Error al obtener usuarios", errorUsers);
  }

  return Promise.resolve({
    data,
    count
  });
}