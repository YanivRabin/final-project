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
import { CssBaseline } from "@mui/material";

const pages = ["Home", "Workout", "Nutrition"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = React.useState<boolean>(false);
  const [isSignPage, setIsSignPage] = React.useState<boolean>(false);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

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
                {pages.map((page) => (
                  <Link key={page} href={`/${page.toLowerCase()}`} passHref>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          )}
          {/* User menu display only in desktop */}
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    href={`/${setting.toLowerCase()}`}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
