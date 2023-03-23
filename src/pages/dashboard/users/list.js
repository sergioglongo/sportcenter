import { useCallback, useEffect, useState } from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Link,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import { UsersApi } from 'src/api/users';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { UserListSearch } from 'src/sections/dashboard/user/user-list-search';
import { UserListTable } from 'src/sections/dashboard/user/user-list-table';

const useUsersSearch = () => {
  const [state, setState] = useState({
    filters: {
      name: undefined,
      category: [],
      status: [],
      inStock: undefined
    },
    page: 0,
    rowsPerPage: 5
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, []);

  return {
    handleFiltersChange,
    handlePageChange,
    handleRowsPerPageChange,
    state
  };
};

const useUsersStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    users: [],
    usersCount: 0
  });

  const handleUsersGet = useCallback(async () => {
    try {
      const response = await UsersApi(searchState);

      if (isMounted()) {
        setState({
          users: response.data,
          usersCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(() => {
      handleUsersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]);

  return {
    ...state
  };
};

const Page = () => {
  const usersSearch = useUsersSearch();
  const usersStore = useUsersStore(usersSearch.state);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Users List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Usuarios
                </Typography>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.index}
                    variant="subtitle2"
                  >
                    Tablero Principal
                  </Link>
                  <Link
                    color="text.primary"
                    component={RouterLink}
                    href={paths.dashboard.users.index}
                    variant="subtitle2"
                  >
                    Usuarios
                  </Link>
                  <Typography
                    color="text.secondary"
                    variant="subtitle2"
                  >
                    Lista
                  </Typography>
                </Breadcrumbs>
              </Stack>
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <Button
                  component={RouterLink}
                  href={paths.dashboard.users.create}
                  startIcon={(
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Crear
                </Button>
              </Stack>
            </Stack>
            <Card>
              <UserListSearch onFiltersChange={usersSearch.handleFiltersChange} />
              <UserListTable
                onPageChange={usersSearch.handlePageChange}
                onRowsPerPageChange={usersSearch.handleRowsPerPageChange}
                page={usersSearch.state.page}
                items={usersStore.users}
                count={usersStore.usersCount}
                rowsPerPage={usersSearch.state.rowsPerPage}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
