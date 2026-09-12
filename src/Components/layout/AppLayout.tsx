

import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Sidebar,
  type AppPage,
  SIDEBAR_WIDTH,
} from "./Sidebar";

import { AddEditStockPage } from "../../pages/AddEditStockPage";
import { StockVisualizationPage } from "../Charts/StockVisualizationPage";
import { PortfolioPage } from "../../pages/Portfoliopage";

export function AppLayout() {
  const [activePage, setActivePage] =
    useState<AppPage>("visualization");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex" }}>
      {isMobileScreen && (
        <AppBar position="fixed" color="default" elevation={1}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ ml: 1 }}>
              Stock Portfolio
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            sm: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          },
          mt: isMobileScreen ? 7 : 0,
        }}
      >
        {activePage === "visualization" && (
          <StockVisualizationPage />
        )}

        {activePage === "portfolio" && <PortfolioPage />}

        {activePage === "addEditStock" && <AddEditStockPage />}
      </Box>
    </Box>
  );
}