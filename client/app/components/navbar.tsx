import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import {
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const pages = ["Home", "Workout", "Nutrition"];
const settings = ["Profile", "Logout"];

const pagesAndSettings = [...pages, ...settings];

function ResponsiveAppBar() {
  // const router = useRouter();
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = React.useState<boolean>(false);
  const [isSignPage, setIsSignPage] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [openLogoutDialog, setOpenLogoutDialog] =
    React.useState<boolean>(false);
  const user = localStorage.getItem("user");

  // Check if the current page is the home page or signIn/signUp page
  React.useEffect(() => {
    pathname === "/" ? setIsHomePage(true) : setIsHomePage(false);
    pathname === "/signIn" || pathname === "/signUp"
      ? setIsSignPage(true)
      : setIsSignPage(false);
  }, [pathname]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setOpenLogoutDialog(false);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("workoutPlan");
    // router.push("/");

    // Redirect to the home page
    window.location.href = "/";
  };

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#F2F2F7" }}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo */}
          <Link href="/" passHref>
            <Image
              src={require("../images/navber/logo.png")}
              alt="logo"
              width={100}
              height={20}
              priority
            />
          </Link>
          {/* show sign in button on the main page */}
          {isHomePage && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {user ? (
                <Link href="/home" passHref>
                  <Button
                    sx={{
                      my: 2,
                      color: "#4e2a84",
                      display: "block",
                      margin: "0 10px",
                      fontWeight: "bold",
                    }}
                  >
                    Home
                  </Button>
                </Link>
              ) : (
                <Link href="/signIn" passHref>
                  <Button
                    sx={{
                      my: 2,
                      color: "#4e2a84",
                      display: "block",
                      margin: "0 10px",
                      fontWeight: "bold",
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </Box>
          )}
          {/* Desktop menu */}
          {!isHomePage && !isSignPage && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center", // Center align pages
              }}
            >
              {pages.map((page) => (
                <Link href={`/${page.toLowerCase()}`} key={page} passHref>
                  <Button
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      margin: "0 10px",
                      textDecoration: "none",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>
          )}
          {/* Mobile menu */}
          {!isHomePage && !isSignPage && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
                color: "#4e2a84",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pagesAndSettings.map((page) =>
                  page === "Logout" ? (
                    <MenuItem key={page} onClick={handleOpenLogoutDialog}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={page}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href={`/${page.toLowerCase()}`}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          )}
          {/* User menu avatar display only in desktop */}
          {!isHomePage && !isSignPage && (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                  setting === "Logout" ? (
                    <MenuItem key={setting} onClick={handleOpenLogoutDialog}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href={`/${setting.toLowerCase()}`}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>

        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={handleCloseLogoutDialog} sx={{ color: "grey" }}>
            Cancel
          </Button>
          <Button onClick={handleLogout} sx={{ color: "red" }} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
export default ResponsiveAppBar;
