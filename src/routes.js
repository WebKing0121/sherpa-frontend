import StylesPage from './containers/StylesPage/StylesPage.jsx';

const Routes = [
  {
    path: "/",
    name: "Camapaigns",
    navIcon: "",
    alt: "",
    exact: true,
    component: StylesPage,
    mobile: true,
  },
  {
    path: "/styles",
    name: "Styles",
    navIcon: "",
    alt: "",
    exact: true,
    component: StylesPage,
    mobile: false,
  },
]

export default Routes;
