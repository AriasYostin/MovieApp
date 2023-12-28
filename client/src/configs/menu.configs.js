import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "Películas",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie"
  },
  {
    display: "Series de Tv",
    path: "/tv",
    icon: <LiveTvOutlinedIcon />,
    state: "tv"
  },
  {
    display: "Buscar",
    path: "/search",
    icon: <SearchOutlinedIcon />,
    state: "search"
  }
];

const user = [
  {
    display: "favoritos",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite"
  },
  {
    display: "reseñas",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews"
  },
  {
    display: "actualizar contraseña",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update"
  }
];

const menuConfigs = { main, user };

export default menuConfigs;