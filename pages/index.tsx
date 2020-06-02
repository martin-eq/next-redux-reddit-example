import { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, createStyles } from '@material-ui/core/styles'

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
    async function dispatchFetchNotes() {
      await dispatch(fetchPosts())
    }
    dispatchFetchNotes()
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
      <CssBaseline />
      <Header />
      <Sidebar />
      <PostDetail />
    </div>
  )
}

export default IndexPage
