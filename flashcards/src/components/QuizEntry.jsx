import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Bar from './Bar'
import {
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
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'

var cardStyle = {
  minHeight: '20vw',
}

const QuizEntry = () => {
  const history = useHistory()
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('questions')) || [],
  )

  const startQuiz = () => {
    localStorage.setItem('questionNum', 0)
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
          questions.map(q => q.answers.length).reduce((a, b) => Math.min(a, b)),
        'Max answers: ' +
          questions.map(q => q.answers.length).reduce((a, b) => Math.max(a, b)),
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
          type: 'radio',
          title: 'Order',
          buttons: [
            {id: 'singleFirst', name: 'Single choice first'},
            {id: 'multipleFirst', name: 'Multiple choice first'},
          ],
        },
        {
          type: 'checkbox',
          title: 'Options',
          buttons: [
            {id: 'shuffleQuestions', name: 'Shuffle questions'},
            {id: 'shuffleAnswers', name: 'Shuffle answers'},
            {id: 'untilAllCorrect', name: 'Until all answers correct'},
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
                    {card.form.map(f =>
                      f.type === 'radio' ? (
                        <>
                          <FormLabel>{f.title}</FormLabel>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group">
                            {f.buttons.map(b => (
                              <FormControlLabel
                                value={b.id}
                                control={<Radio />}
                                label={b.name}
                              />
                            ))}
                          </RadioGroup>
                        </>
                      ) : (
                        <>
                          <FormLabel>{f.title}</FormLabel>
                          <FormGroup>
                            {f.buttons.map(b => (
                              <FormControlLabel
                                value={b.id}
                                control={<Checkbox />}
                                label={b.name}
                              />
                            ))}
                          </FormGroup>
                        </>
                      ),
                    )}
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
                    onClick={card.buttonAction}>
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
