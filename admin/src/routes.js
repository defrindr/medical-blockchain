// import
import Dashboard from "views/Dashboard/Dashboard";
import Pasien from "views/Dashboard/Pasien";
import PasienAdd from "views/Dashboard/Pasien/add";

import PasienRiwayatMedisList from "views/Dashboard/Pasien/riwayat-medis";
import PasienRiwayatMedisAdd from "views/Dashboard/Pasien/riwayat-medis/add";

import PasienAnamnesisList from "views/Dashboard/Pasien/anamnesis";
import PasienAnamnesisAdd from "views/Dashboard/Pasien/anamnesis/add";
// import Tables from "views/Dashboard/Tables";
// import Billing from "views/Dashboard/Billing";
// import RTLPage from "views/Dashboard/RTL";
// import Profile from "views/Dashboard/Profile";
// import SignIn from "views/Auth/SignIn.js";
// import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    category: true,
    name: "Pasien",
    state: "pasienCollapse",
    layout: "/admin",
    // path: "/pasien",
    views: [],
  },
  {
    path: "/pasien/list",
    name: "Pasien",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Pasien,
    layout: "/admin",
  },
  {
    path: "/pasien/add",
    name: "Tambah Pasien",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PasienAdd,
    layout: "/admin",
    secondaryNavbar: true,
  },
  {
    path: "/pasien/riwayat-medis/list/:id",
    name: "List Riwayat Medis",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PasienRiwayatMedisList,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/pasien/riwayat-medis/add/:id",
    name: "Tambah Riwayat Medis",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PasienRiwayatMedisAdd,
    layout: "/admin",
    secondaryNavbar: true,
    hide: true,
  },

  {
    path: "/pasien/anamnesis/list/:id",
    name: "List Anamnesis",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PasienAnamnesisList,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/pasien/anamnesis/add/:id",
    name: "Tambah Anamnesis",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: PasienAnamnesisAdd,
    layout: "/admin",
    secondaryNavbar: true,
    hide: true,
  },

  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color="inherit" />,
  //   component: Billing,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
