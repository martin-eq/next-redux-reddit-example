import { FunctionComponent, useEffect } from 'react'
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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import Tooltip from '@material-ui/core/Tooltip'
import Slide from '@material-ui/core/Slide'

import {
  selectPosts,
  setCurrentPost,
  dismissPost,
  fetchPosts,
} from '../lib/slices/redditSlice'
import { API_URL } from '../lib/constants'
import { setDrawer } from '../lib/slices/drawerSlice'
import { verifyUrl } from '../lib/utils'

const PostList: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { posts, currentPost, readPostIds, dismissedPostIds } = useSelector(
    selectPosts
  )

  const handleSelectPost = (post) => {
    dispatch(setCurrentPost(post))
    // Close drawer after selecting a post in mobile
    dispatch(setDrawer(false))
  }

  useEffect(() => {
    if (!currentPost && posts.length) {
      // Select first post
      dispatch(setCurrentPost(posts[0]))
    }
  }, [posts])

  useEffect(() => {
    // If the user dismissed all posts in the view, request more
    if (Object.keys(dismissedPostIds).length === posts.length) {
      dispatch(fetchPosts())
    }
  }, [dismissedPostIds, posts])

  return (
    <List disablePadding>
      {posts.map((post) => (
        <Slide
          direction="right"
          in={!dismissedPostIds[post.id]}
          mountOnEnter
          unmountOnExit
          timeout={300}
          key={post.id}
        >
          <div>
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
                  <Typography variant="h6" color="textPrimary">
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
                      color="textSecondary"
                    >
                      {post.num_comments} comments
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Dismiss Post">
                  <IconButton
                    color="secondary"
                    edge="end"
                    onClick={() => dispatch(dismissPost(post.id))}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider component="li" />
          </div>
        </Slide>
      ))}
    </List>
  )
}

export default PostList
