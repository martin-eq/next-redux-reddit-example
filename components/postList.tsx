import { FunctionComponent, Fragment } from 'react'
import { useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import { selectPosts } from '../lib/slices/redditSlice'

const PostList: FunctionComponent = () => {
  const { posts } = useSelector(selectPosts)

  return (
    <List disablePadding>
      {posts.map((post) => (
        <Fragment key={post.name}>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={post.title} src={post.thumbnail} />
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {post.author}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Dismiss Post - 200 comments
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
