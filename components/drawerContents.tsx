import { FunctionComponent } from 'react'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Pagination from '@material-ui/lab/Pagination'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import PostList from './postList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
)

const DrawerContents: FunctionComponent = () => {
  const classes = useStyles()

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Reddit Posts
        </Typography>
      </Toolbar>
      <Divider />
      <PostList />
      <Divider />
      <Pagination className={classes.pagination} count={10} color="primary" />
    </div>
  )
}

export default DrawerContents
