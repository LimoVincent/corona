import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

function Appbar() {
  const classes = useStyles()
  return (
    <div style={{ width: '100%' }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Coronavirus (Covid-19)
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Appbar
