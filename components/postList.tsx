import { FunctionComponent, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Badge from '@material-ui/core/Badge'

import {
  selectPosts,
  setCurrentPost,
  selectReadPostIds,
} from '../lib/slices/redditSlice'
import { API_URL } from '../lib/constants'
import { setDrawer } from '../lib/slices/drawerSlice'

const PostList: FunctionComponent = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const readPostIds = useSelector(selectReadPostIds)
  const verifyUrl = (url: string): string | undefined => {
    try {
      new URL(url)
      // If no exception was thrown, URL is valid
      return url
    } catch (e) {
      // URL is invalid if we cannot create an URL object
      return undefined
    }
  }

  const handleSelectPost = (post) => {
    dispatch(setCurrentPost(post))
    // Close drawer after selecting a post in mobile
    dispatch(setDrawer(false))
  }

  return (
    <List disablePadding>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <ListItem
            button
            alignItems="flex-start"
            onClick={() => handleSelectPost(post)}
          >
            <ListItemAvatar>
              <Badge
                color="primary"
                badgeContent=" "
                invisible={readPostIds[post.id]}
              >
                <Avatar
                  alt={post.title}
                  src={verifyUrl(post.thumbnail)}
                  variant="square"
                />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h5" color="textPrimary">
                  {post.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component="div"
                    variant="body2"
                    color="textPrimary"
                  >
                    <Link
                      href={`${API_URL}/u/${post.author}`}
                      onClick={(event: React.SyntheticEvent) =>
                        // Avoid this click event to propagate to parent handler
                        event.stopPropagation()
                      }
                      target="_blank"
                      rel="noopener"
                    >
                      u/{post.author}
                    </Link>
                  </Typography>
                  <Typography
                    component="div"
                    variant="caption"
                    color="textPrimary"
                  >
                    Dismiss Post - {post.num_comments} comments
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider component="li" />
        </Fragment>
      ))}
    </List>
  )
}

export default PostList
