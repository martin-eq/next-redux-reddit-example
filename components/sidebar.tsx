import { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'
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
  toggleAllPosts,
  selectPosts,
  selectIsLoading,
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
      paddingBottom: 42, // Size of the dismiss all button
    },
  })
)

const Sidebar: FunctionComponent = () => {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { hasMore } = useSelector(selectPosts)
  const mobileOpen = useSelector(selectMobileOpen)
  const isLoading = useSelector(selectIsLoading)

  const drawer = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Reddit Posts
        </Typography>
      </Toolbar>
      <Divider />
      <InfiniteScroll
        loadMore={() => dispatch(fetchPosts())}
        hasMore={hasMore}
        initialLoad={false}
        loader={
          <Box p={1} textAlign="center" hidden={!isLoading} key={0}>
            <CircularProgress />
          </Box>
        }
        useWindow={false}
      >
        <PostList />
      </InfiniteScroll>
      <Box position="fixed" bottom="0" width={DRAWER_WIDTH} zIndex="modal">
        <Button
          variant="contained"
          color={hasMore ? 'secondary' : 'primary'}
          size="large"
          startIcon={hasMore ? <ClearIcon /> : <CheckIcon />}
          onClick={() => dispatch(toggleAllPosts())}
          fullWidth
        >
          {hasMore ? 'Dismiss All' : 'Show me the posts again, please'}
        </Button>
      </Box>
    </>
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
