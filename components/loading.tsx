import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { FunctionComponent } from 'react'

type PropTypes = {
  open: boolean
  handleClose?: () => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

const Loading: FunctionComponent<PropTypes> = ({
  open,
  handleClose,
}: PropTypes) => {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading
