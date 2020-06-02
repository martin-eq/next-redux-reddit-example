import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { DRAWER_WIDTH } from '../constants'
import { toggleDrawer } from '../lib/slices/drawerSlice'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${DRAWER_WIDTH})`,
        marginLeft: DRAWER_WIDTH,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)

const Header: FunctionComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const post = {}

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleDrawer())}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {post.title || 'Select a Reddit post to view details'}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
