import { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'

import { DRAWER_WIDTH } from '../constants'
import DrawerContents from './drawerContents'
import { toggleDrawer, selectMobileOpen } from '../lib/slices/drawerSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
  })
)

const Sidebar: FunctionComponent = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const mobileOpen = useSelector(selectMobileOpen)

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={() => dispatch(toggleDrawer())}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerContents />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <DrawerContents />
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Sidebar
