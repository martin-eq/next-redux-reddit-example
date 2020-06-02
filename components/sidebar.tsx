import { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'

import { DRAWER_WIDTH } from '../lib/constants'
import PostList from './postList'
import { toggleDrawer, selectMobileOpen } from '../lib/slices/drawerSlice'
import {
  fetchPosts,
  selectAfter,
  selectLoading,
} from '../lib/slices/redditSlice'

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
    loader: {
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  })
)

const Sidebar: FunctionComponent = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const mobileOpen = useSelector(selectMobileOpen)
  const after = useSelector(selectAfter)
  const isLoading = useSelector(selectLoading) === 'loading'

  const drawer = (
    <InfiniteScroll
      loadMore={() => dispatch(fetchPosts({ after }))}
      // Avoids double initial requests
      // Reference: https://github.com/danbovey/react-infinite-scroller/issues/143#issuecomment-387029723
      hasMore={!isLoading}
      loader={
        <div className={classes.loader} key={0}>
          <CircularProgress />
        </div>
      }
      useWindow={false}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Reddit Posts
        </Typography>
      </Toolbar>
      <Divider />
      <PostList />
    </InfiniteScroll>
  )

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
          {drawer}
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
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default Sidebar
