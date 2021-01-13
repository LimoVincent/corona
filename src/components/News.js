import { Card, CardContent, Paper, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './../App.css'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    margin: 50,
  },
})

export const News = () => {
  const classes = useStyles()
  const [news, setNews] = useState([])
  const [query] = useState('Coronavirus,Covid-19,trump')

  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(() => data.hits)
      })
  }, [query])

  return (
    <>
      <h1>Global Coronavirus news</h1>
      <Paper elevation={1}>
        {news.map(
          ({ author, comment_text, objectID, story_title, story_url }) => (
            <Card>
              {story_title && (
                <Typography variant='h6'>
                  ✅ {story_title}{' '}
                  <a href={story_url}> {story_url && 'learn more'}</a>{' '}
                </Typography>
              )}
            </Card>
          )
        )}
      </Paper>
    </>
  )
}
