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

const sidebarNavItems: { page: AppPage; label: string; icon: React.ReactNode }[] = [
  { page: "visualization", label: "Visualization", icon: <ShowChartIcon /> },
  { page: "portfolio", label: "Portfolio", icon: <AccountBalanceWalletIcon /> },
  { page: "addEditStock", label: "Add / Edit Stock", icon: <AddCircleOutlineIcon /> },
];

export const Sidebar = ({ activePage, onPageChange, isMobileOpen, onMobileClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navList = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Stock Portfolio
        </Typography>
      </Toolbar>
      <List>
        {sidebarNavItems.map((navItem) => (
          <ListItemButton
            key={navItem.page}
            selected={activePage === navItem.page}
            onClick={() => {
              onPageChange(navItem.page);
              if (isMobileScreen) onMobileClose();
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
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" } }}
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
        "& .MuiDrawer-paper": { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
      }}
    >
      {navList}
    </Drawer>
  );
};