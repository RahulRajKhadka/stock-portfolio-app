import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export type AppPage = "visualization" | "portfolio";

interface SidebarProps {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isDesktopCollapsed: boolean;
  onToggleDesktopCollapsed: () => void;
}

export const SIDEBAR_WIDTH_EXPANDED = 220;
export const SIDEBAR_WIDTH_COLLAPSED = 72;

const sidebarNavItems: { page: AppPage; label: string; icon: React.ReactNode }[] = [
  { page: "visualization", label: "Visualization", icon: <ShowChartIcon /> },
  { page: "portfolio", label: "Portfolio", icon: <AccountBalanceWalletIcon /> },
];

export const Sidebar = ({
  activePage,
  onPageChange,
  isMobileOpen,
  onMobileClose,
  isDesktopCollapsed,
  onToggleDesktopCollapsed,
}: SidebarProps) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const currentDesktopWidth = isDesktopCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  const navList = (
    <>
      <Toolbar sx={{ justifyContent: isDesktopCollapsed && !isMobileScreen ? "center" : "space-between" }}>
        {(!isDesktopCollapsed || isMobileScreen) && (
          <Typography variant="h6" noWrap>
            StockTrack
          </Typography>
        )}
        {!isMobileScreen && (
          <IconButton size="small" onClick={onToggleDesktopCollapsed}>
            {isDesktopCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>

      <List>
        {sidebarNavItems.map((navItem) => {
          const showCollapsed = isDesktopCollapsed && !isMobileScreen;
          const button = (
            <ListItemButton
              key={navItem.page}
              selected={activePage === navItem.page}
              onClick={() => {
                onPageChange(navItem.page);
                if (isMobileScreen) onMobileClose();
              }}
              sx={{ justifyContent: showCollapsed ? "center" : "flex-start", px: showCollapsed ? 2 : 3 }}
            >
              <ListItemIcon sx={{ minWidth: showCollapsed ? "auto" : 40, justifyContent: "center" }}>
                {navItem.icon}
              </ListItemIcon>
              {!showCollapsed && <ListItemText primary={navItem.label} />}
            </ListItemButton>
          );

          return showCollapsed ? (
            <Tooltip key={navItem.page} title={navItem.label} placement="right">
              {button}
            </Tooltip>
          ) : (
            button
          );
        })}
      </List>
    </>
  );

  if (isMobileScreen) {
    return (
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH_EXPANDED, boxSizing: "border-box" } }}
      >
        {navList}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: currentDesktopWidth,
        flexShrink: 0,
        transition: "width 0.2s ease",
        "& .MuiDrawer-paper": {
          width: currentDesktopWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.2s ease",
        },
      }}
    >
      {navList}
    </Drawer>
  );
};