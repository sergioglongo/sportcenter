import { Box, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';
import { BreadcrumbsSeparator } from 'src/components/breadcrumbs-separator';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { UserCreateForm } from 'src/sections/dashboard/user/user-create-form';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Dashboard: User Create" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h4">
                Creacion de Usuario
              </Typography>
              <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.index}
                  variant="subtitle2"
                >
                  Dashboard
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
                  Crear
                </Typography>
              </Breadcrumbs>
            </Stack>
            <UserCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
