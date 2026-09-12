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
  SIDEBAR_WIDTH_EXPANDED,
  SIDEBAR_WIDTH_COLLAPSED,
} from "./Sidebar";
import { StockVisualizationPage } from "../Charts/StockVisualizationPage";
import { PortfolioPage } from "../../pages/Portfoliopage";


export function AppLayout() {
  const [activePage, setActivePage] = useState<AppPage>("visualization");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const currentSidebarWidth = isDesktopCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <Box sx={{ display: "flex" }}>
      {isMobileScreen && (
        <AppBar position="fixed" color="default" elevation={1}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setIsMobileSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 1 }}>
              StockTrack
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
        isDesktopCollapsed={isDesktopCollapsed}
        onToggleDesktopCollapsed={() => setIsDesktopCollapsed((prev) => !prev)}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${currentSidebarWidth}px)` },
          mt: isMobileScreen ? 7 : 0,
          transition: "width 0.2s ease",
        }}
      >
        {activePage === "visualization" && <StockVisualizationPage />}
        {activePage === "portfolio" && <PortfolioPage />}
      </Box>
    </Box>
  );
}