import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { AddCircleOutlined as AddCircleOutlineIcon } from "@mui/icons-material";

export type AppPage = "visualization" | "portfolio" | "addEditStock";

interface SidebarProps {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const SIDEBAR_WIDTH = 220;

const sidebarNavItems: {
  page: AppPage;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    page: "visualization",
    label: "Visualization",
    icon: <ShowChartIcon />,
  },
  {
    page: "portfolio",
    label: "Portfolio",
    icon: <AccountBalanceWalletIcon />,
  },
  {
    page: "addEditStock",
    label: "Add / Edit Stock",
    icon: <AddCircleOutlineIcon />,
  },
];

export const Sidebar = ({
  activePage,
  onPageChange,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navList = (
    <>
      
      <Toolbar
        sx={{
          minHeight: "72px !important",
          px: 2.5,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.2px",
            }}
          >
            Stock Portfolio
          </Typography>

        
        </Box>
      </Toolbar>

      {/* Navigation */}
      <List
        sx={{
          px: 1.5,
          pt: 1,
        }}
      >
        {sidebarNavItems.map((navItem) => (
          <ListItemButton
            key={navItem.page}
            selected={activePage === navItem.page}
            onClick={() => {
              onPageChange(navItem.page);

              if (isMobileScreen) {
                onMobileClose();
              }
            }}
            sx={{
              minHeight: 44,
              mb: 0.5,
              px: 1.5,
              borderRadius: 2,

              "& .MuiListItemIcon-root": {
                minWidth: 38,
                color: "text.secondary",
              },

              "& .MuiListItemText-primary": {
                fontSize: "14px",
                fontWeight: 500,
              },

              "&:hover": {
                backgroundColor: "action.hover",
              },

              "&.Mui-selected": {
                backgroundColor: "action.selected",
              },

              "&.Mui-selected .MuiListItemIcon-root": {
                color: "primary.main",
              },

              "&.Mui-selected .MuiListItemText-primary": {
                color: "primary.main",
                fontWeight: 600,
              },

              "&.Mui-selected:hover": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <ListItemIcon>{navItem.icon}</ListItemIcon>

            <ListItemText primary={navItem.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  if (isMobileScreen) {
    return (
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
          },
        }}
      >
        {navList}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          boxShadow: "1px 0 4px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      {navList}
    </Drawer>
  );
};