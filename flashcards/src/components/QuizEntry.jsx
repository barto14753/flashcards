import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Bar from './Bar'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material'
import {DEFAULT_OPTIONS} from '../utils/Options'

var cardStyle = {
  minHeight: '20vw',
}

const QuizEntry = () => {
  const history = useHistory()
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('questions')) || [],
  )

  const [form, setForm] = useState(
    JSON.parse(localStorage.getItem('options')) || DEFAULT_OPTIONS,
  )

  const handleChange = event => {
    const id = event.target.id
    const isChecked = event.target.checked
    setForm(prevValues => ({
      ...prevValues,
      [id]: isChecked,
    }))
  }

  const startQuiz = event => {
    localStorage.setItem('questionNum', 0)
    localStorage.setItem('options', JSON.stringify(form))
    history.replace('/quiz')
  }

  const cards = [
    {
      title: 'Questions',
      description: [
        'Count: ' + questions.length.toString(),
        'Single choice: ' +
          questions.filter(q => q.correct.length === 1).length.toString(),
        'Multiple choice: ' +
          questions.filter(q => q.correct.length > 1).length.toString(),
        'Min answers: ' +
          questions
            .map(q => q.answers.length)
            .reduce((a, b) => Math.min(a, b), 0),
        'Max answers: ' +
          questions
            .map(q => q.answers.length)
            .reduce((a, b) => Math.max(a, b), 0),
      ],
      form: [],
      buttonText: 'Show details',
      buttonVariant: 'outlined',
    },
    {
      title: 'Quiz',
      description: [],
      form: [
        {
          title: 'Options',
          buttons: [
            {id: 'shuffleQuestions', name: 'Shuffle questions'},
            {id: 'shuffleAnswers', name: 'Shuffle answers'},
            {id: 'showAnswers', name: 'Show correct answers'},
          ],
        },
      ],

      buttonText: 'Start quiz',
      buttonVariant: 'contained',
      buttonAction: startQuiz,
    },
    {
      title: 'Statistics',
      description: [
        'Correct: {}',
        'Wrong: {}',
        'Correct/Wrong %: {}',
        'Questions answered: {}',
        'Uploaded: {}',
      ],
      form: [],
      buttonText: 'Show details',
      buttonVariant: 'outlined',
    },
  ]

  return (
    <>
      <Bar />
      {questions.length === 0 ? (
        <Alert severity="error">You need to load questions first</Alert>
      ) : (
        <></>
      )}
      <Container maxWidth="md" component="main" sx={{p: 5}}>
        <Grid container spacing={5} alignItems="flex-end">
          {cards.map(card => (
            <Grid
              item
              key={card.title}
              xs={12}
              sm={card.title === 'Quiz' ? 12 : 6}
              md={4}>
              <Card style={cardStyle}>
                <CardHeader
                  title={card.title}
                  subheader={card.subheader}
                  titleTypographyProps={{align: 'center'}}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: theme =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}></Box>
                  <FormControl>
                    {card.form.map(f => (
                      <>
                        <FormLabel>{f.title}</FormLabel>
                        <FormGroup>
                          {f.buttons.map(b => (
                            <FormControlLabel
                              value={b.id}
                              control={
                                <Checkbox
                                  id={b.id}
                                  checked={form[b.id]}
                                  onChange={handleChange}
                                />
                              }
                              label={b.name}
                            />
                          ))}
                        </FormGroup>
                      </>
                    ))}
                  </FormControl>
                  <ul>
                    {card.description.map(line => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="left"
                        key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={card.buttonVariant}
                    onClick={card.buttonAction}
                    disabled={questions.length === 0}>
                    {card.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default QuizEntry
