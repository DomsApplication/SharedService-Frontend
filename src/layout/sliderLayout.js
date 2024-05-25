import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PeopleIcon from '@mui/icons-material/People';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import SettingsIcon from '@mui/icons-material/Settings';
import WebAssetIcon from '@mui/icons-material/WebAsset';

/**
 * Link used to implemet
 * -------------------------
 * https://blog.logrocket.com/creating-responsive-sidebar-react-pro-sidebar-mui/
 * https://www.npmjs.com/package/react-pro-sidebar
 * https://azouaoui-med.github.io/react-pro-sidebar/?path=/docs/menuitem--basic
 */

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function SliderLayout({ toggle }) {
  return (
    <>
      <Sidebar
        style={{ height: "100vh", border: "0" }}
        breakPoint="sm"
        transitionDuration={400}
      >
        <Menu>
          <MenuItem style={{ height: "65px"}}></MenuItem>
          <MenuItem component={<Link to="/dashboard" className="link" />} icon={<HomeOutlinedIcon />}>  Dashboard </MenuItem>
          <SubMenu icon={<ManageAccountsIcon />} label="User Management">
            <MenuItem component={<Link to="/user" className="link" />} icon={<PeopleIcon />}>Users</MenuItem>
            <MenuItem component={<Link to="/role" className="link" />} icon={<ChecklistIcon />}>Roles</MenuItem>
          </SubMenu>
          <MenuItem component={<Link to="/datamanagement" className="link" />} icon={<CalendarViewDayIcon />}>Data Management</MenuItem>
          <MenuItem component={<Link to="/setting" className="link" />} icon={<SettingsIcon />}>Settings</MenuItem>
          <MenuItem component={<Link to="/application" className="link" />} icon={<WebAssetIcon />}>Application</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
}

export default SliderLayout;
