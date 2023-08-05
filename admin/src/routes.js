// import
import Dashboard from "views/Admin/Dashboard";
import Pasien from "views/Admin/Pasien";
import PasienAdd from "views/Admin/Pasien/add";
import PasienRiwayatMedisList from "views/Admin/Pasien/riwayat-medis/index";
import PasienRiwayatMedisAdd from "views/Admin/Pasien/riwayat-medis/add";
import RiwayatMedisList from "views/Admin/RiwayatMedis/index";
import PerawatList from "views/Admin/RiwayatMedis/Perawat/index";
import PerawatAdd from "views/Admin/RiwayatMedis/Perawat/add";

import UserList from "views/Admin/User/index";
import UserAdd from "views/Admin/User/add";
import UserEdit from "views/Admin/User/edit";

import GiziList from "views/Admin/RiwayatMedis/Gizi/index";
import GiziAdd from "views/Admin/RiwayatMedis/Gizi/add";

import FarmasiList from "views/Admin/RiwayatMedis/Farmasi/index";
import FarmasiAdd from "views/Admin/RiwayatMedis/Farmasi/add";

import LaboranList from "views/Admin/RiwayatMedis/Laboran/index";
import LaboranAdd from "views/Admin/RiwayatMedis/Laboran/add";

import { HomeIcon, StatsIcon } from "components/Icons/Icons";
import SignIn from "views/Auth/SignIn";
import Profile from "views/Admin/Profile";
import { RiwayatMedisDetail } from "views/Admin/RiwayatMedis/Detail";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
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
    path: "/user/list",
    name: "Pengguna",
    icon: <HomeIcon color="inherit" />,
    component: UserList,
    layout: "/admin",
    roles: ["admin"],
  },
  {
    path: "/user/add",
    name: "Tambah Pengguna",
    icon: <HomeIcon color="inherit" />,
    component: UserAdd,
    layout: "/admin",
    secondaryNavbar: true,
    hide: true,
    roles: ["admin"],
  },
  {
    path: "/user/edit/:id",
    name: "Ubah Pengguna",
    icon: <HomeIcon color="inherit" />,
    component: UserEdit,
    layout: "/admin",
    secondaryNavbar: true,
    hide: true,
    roles: ["admin"],
  },

  {
    path: "/pasien/list",
    name: "Pasien",
    icon: <HomeIcon color="inherit" />,
    component: Pasien,
    layout: "/admin",
    roles: ["doctor"],
  },
  {
    path: "/pasien/add",
    name: "Tambah Pasien",
    icon: <HomeIcon color="inherit" />,
    component: PasienAdd,
    layout: "/admin",
    secondaryNavbar: true,
    hide: true,
  },
  {
    path: "/pasien/riwayat-medis/list/:id",
    name: "List Riwayat Medis",
    icon: <HomeIcon color="inherit" />,
    component: PasienRiwayatMedisList,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/pasien/riwayat-medis/add/:id",
    name: "Tambah Riwayat Medis",
    icon: <HomeIcon color="inherit" />,
    component: PasienRiwayatMedisAdd,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/riwayat-medis/list",
    name: "List Riwayat Medis",
    icon: <HomeIcon color="inherit" />,
    component: RiwayatMedisList,
    layout: "/admin",
    roles: ["nurse", "gizi", "laboran", "farmasi", "patient"],
  },

  {
    path: "/riwayat-medis/detail/:paramCheckup",
    name: "List Perawat",
    icon: <HomeIcon color="inherit" />,
    component: RiwayatMedisDetail,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/riwayat-medis/perawat/list/:paramCheckup",
    name: "List Perawat",
    icon: <HomeIcon color="inherit" />,
    component: PerawatList,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/riwayat-medis/perawat/add/:paramCheckup",
    name: "Tambah Perawat",
    icon: <HomeIcon color="inherit" />,
    component: PerawatAdd,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/riwayat-medis/gizi/list/:paramCheckup",
    name: "List Gizi",
    icon: <HomeIcon color="inherit" />,
    component: GiziList,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/riwayat-medis/gizi/add/:paramCheckup",
    name: "Tambah Gizi",
    icon: <HomeIcon color="inherit" />,
    component: GiziAdd,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/riwayat-medis/farmasi/list/:paramCheckup",
    name: "List Farmasi",
    icon: <HomeIcon color="inherit" />,
    component: FarmasiList,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/riwayat-medis/farmasi/add/:paramCheckup",
    name: "Tambah Farmasi",
    icon: <HomeIcon color="inherit" />,
    component: FarmasiAdd,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/riwayat-medis/laboran/list/:paramCheckup",
    name: "List Laboran",
    icon: <HomeIcon color="inherit" />,
    component: LaboranList,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/riwayat-medis/laboran/add/:paramCheckup",
    name: "Tambah Laboran",
    icon: <HomeIcon color="inherit" />,
    component: LaboranAdd,
    layout: "/admin",
    hide: true,
  },

  {
    path: "/login",
    name: "Login",
    icon: <StatsIcon color="inherit" />,
    component: SignIn,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/profile",
    name: "Profile",
    icon: <StatsIcon color="inherit" />,
    component: Profile,
    layout: "/admin",
  },
];
export default dashRoutes;
