import { FunctionComponent } from 'react'
import Head from 'next/head'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import Header from '../components/header'
import Sidebar from '../components/sidebar'
import PostDetail from '../components/postDetail'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
  })
)

const IndexPage: FunctionComponent = () => {
  const classes = useStyles()

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
