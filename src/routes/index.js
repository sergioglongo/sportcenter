import { Outlet } from 'react-router-dom';
// import { Layout as MarketingLayout } from 'src/layouts/marketing';
// import HomePage from 'src/pages';
import Dashboard from 'src/pages/dashboard/index';
import Error401Page from 'src/pages/401';
import Error404Page from 'src/pages/404';
import Error500Page from 'src/pages/500';
import ContactPage from 'src/pages/contact';
import { authRoutes } from './auth';
// import CheckoutPage from 'src/pages/checkout';
// import PricingPage from 'src/pages/pricing';
// import { authDemoRoutes } from './auth-demo';
// import { componentsRoutes } from './components';
import { dashboardRoutes } from './dashboard';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { Suspense } from 'react';

export const routes = [
  {
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      // {
      //   path: 'pricing',
      //   element: <PricingPage />
      // }
      // ...componentsRoutes
    ]
  },
  ...authRoutes,
  // ...authDemoRoutes,
  ...dashboardRoutes,
  // {
  //   path: 'checkout',
  //   element: <CheckoutPage />
  // },
  {
    path: 'contact',
    element: <ContactPage />
  },
  {
    path: '401',
    element: <Error401Page />
  },
  {
    path: '404',
    element: <Error404Page />
  },
  {
    path: '500',
    element: <Error500Page />
  },
  {
    path: '*',
    element: <Error404Page />
  }
];
