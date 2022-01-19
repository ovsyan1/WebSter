import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { logOutAction } from '../../features/userSlice';
import { useDispatch } from "react-redux";
import { logOutRequest } from "../../api";

import { Wrapper, LinkWrapper } from './styles';

const Drawer: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const dispatch = useDispatch();
    const deleteUser = () => {
        logOutRequest();
        dispatch(logOutAction());
      }
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => {setOpen(false)}}
        onOpen={() => {}}
      >
          <Wrapper>
              <Box textAlign="center" p={2}
                >
                Меню
                </Box>
                <Divider />
                <List>
                    <LinkWrapper to="/repository">
                        <ListItem button>
                            <ListItemText primary={'Хранилище'} />
                        </ListItem>
                    </LinkWrapper>
                    <LinkWrapper to="/orders">
                        <ListItem button>
                            <ListItemText primary={'Закази'} />
                        </ListItem>
                    </LinkWrapper>
                    <LinkWrapper to="/templates">
                        <ListItem button>
                            <ListItemText primary={'Шаблони'} />
                        </ListItem>
                    </LinkWrapper>
                    <LinkWrapper to="/history">
                        <ListItem button>
                            <ListItemText primary={'Історія'} />
                        </ListItem>
                    </LinkWrapper>
                    <LinkWrapper to="/map">
                        <ListItem button>
                            <ListItemText primary={'Мапа'} />
                        </ListItem>
                    </LinkWrapper>
                    <LinkWrapper to="/users-images">
                        <ListItem button>
                            <ListItemText primary={'Ваші зображення'} />
                        </ListItem>
                    </LinkWrapper>
                    <LinkWrapper to="/settings">
                        <ListItem button>
                            <ListItemText primary={'Налаштування'} />
                        </ListItem>
                    </LinkWrapper>
                    <hr />
                    <LinkWrapper to="/welcome">
                        <ListItem button>
                            <ListItemText primary={'Вийти'} onClick={deleteUser}/>
                        </ListItem>
                    </LinkWrapper>
                </List>
          </Wrapper>
      </SwipeableDrawer>
    </div>
  );
};

export default Drawer;
