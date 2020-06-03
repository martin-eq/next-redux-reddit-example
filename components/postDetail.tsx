import { FunctionComponent } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import LinkIcon from '@material-ui/icons/Link'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import { selectPosts } from '../lib/slices/redditSlice'
import { PLACEHOLDER_IMAGE, API_URL } from '../lib/constants'
import Post from '../lib/types/post'
import { verifyUrl } from '../lib/utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    card: {
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
      },
      margin: 'auto',
    },
  })
)

const PostDetail: FunctionComponent = () => {
  const classes = useStyles()
  const { currentPost: post } = useSelector(selectPosts)

  // Prevents trying to render when a post wasn't selected yet
  if (!post) return null

  const renderMedia = (post: Post) => {
    if (post.is_video) {
      return post.secure_media.reddit_video.fallback_url
    } else if (post.post_hint === 'image') {
      return post.url
    } else {
      return verifyUrl(post.thumbnail, PLACEHOLDER_IMAGE)
    }
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Card className={classes.card}>
        <CardHeader
          title={post.title}
          subheader={moment.unix(post.created).fromNow()}
        />
        <CardMedia
          src={renderMedia(post)}
          component={post.is_video ? 'video' : 'img'}
          title={post.title}
          controls
          autoPlay
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Posted by u/{post.author}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => window.open(`${API_URL}${post.permalink}`)}
          >
            <LinkIcon />
          </IconButton>
        </CardActions>
      </Card>
    </main>
  )
}

export default PostDetail
