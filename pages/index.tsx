import { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Head from 'next/head'

import Header from '../components/header'
import Sidebar from '../components/sidebar'
import PostDetail from '../components/postDetail'
import { fetchPosts } from '../lib/slices/redditSlice'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
)

const IndexPage: FunctionComponent = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    async function dispatchLoadPosts() {
      await dispatch(fetchPosts())
    }
    dispatchLoadPosts()
  }, [dispatch])

  return (
    <div className={classes.root}>
      <Head>
        <title>Reddit Example using Next.js and Redux</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Header />
      <Sidebar />
      <PostDetail />
    </div>
  )
}

export default IndexPage
