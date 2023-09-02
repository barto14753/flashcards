import React, {useState} from 'react'
import Bar from './Bar'
import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {
  CORRECT,
  INCORRECT_CHOSEN,
  NOT_ALL_CORRECT_CHOSEN,
  NOT_ANSWERED,
} from '../utils/QuestionResult'
import {DEFAULT_OPTIONS} from '../utils/Options'

const useStyles = makeStyles(theme => ({
  correctAnswer: {
    background: '#66bb6a',
    paddingRight: '25px',
    marginTop: '15px',
    borderRadius: '5px',
    color: 'white',
  },

  wrongAnswer: {
    background: '#f44336',
    paddingRight: '25px',
    marginTop: '15px',
    borderRadius: '5px',
    color: 'white',
  },
}))

const Quiz = () => {
  const classes = useStyles()
  const options = JSON.parse(localStorage.getItem('options')) || DEFAULT_OPTIONS

  const [result, setResult] = useState(NOT_ANSWERED)
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('questions')) || [],
  )
  const [questionNum, setQuestionNum] = useState(
    parseInt(localStorage.getItem('questionNum')) || 0,
  )
  const [isAnswered, setIsAnswered] = useState(false)

  const question = questions[questionNum]
  const [choices, setChoices] = useState(
    Array(question.answers.length).fill(false) || [],
  )
  if (choices.length != question.answers.length) {
    setChoices(Array(question.answers.length).fill(false))
  }
  const isSingleChoice = question.correct.length === 1
  const getFormLabelClass = answer => {
    const answerIndex = question.answers.findIndex(val => val === answer)
    if (isAnswered && (!options.showAnswers || result === CORRECT)) {
      return question.correct.includes(answerIndex)
        ? classes.correctAnswer
        : classes.wrongAnswer
    }
  }

  const getResult = () => {
    switch (result) {
      case CORRECT:
        return <Alert severity="success">This is correct answer!</Alert>
      case NOT_ALL_CORRECT_CHOSEN:
        return (
          <Alert severity="warning">
            You missed at least one correct answer!
          </Alert>
        )
      case INCORRECT_CHOSEN:
        return <Alert severity="error">This is not correct!</Alert>
      default:
        return
    }
  }

  const handleRadioChange = event => {
    const answerValue = event.target.value
    const answerIdx = question.answers.indexOf(answerValue)
    const newChoices = Array(question.answers.length).fill(false)
    newChoices[answerIdx] = true
    setChoices(newChoices)
  }

  const handleCheckboxChange = event => {
    const answerValue = event.target.value
    const answerIdx = question.answers.indexOf(answerValue)
    const newChoices = Array.from(choices)
    newChoices[answerIdx] = !newChoices[answerIdx]
    setChoices(newChoices)
  }

  const handleCheck = event => {
    const allCorrectChosen = question.correct.every(
      correctIdx => choices[correctIdx],
    )
    const sameCorrectAnswersAndChoices =
      question.correct.length === choices.filter(c => c).length

    if (allCorrectChosen && sameCorrectAnswersAndChoices) setResult(CORRECT)
    else if (allCorrectChosen) setResult(INCORRECT_CHOSEN)
    else setResult(NOT_ALL_CORRECT_CHOSEN)
    setIsAnswered(true)
  }

  const handleNext = () => {
    const newQuestionNum = options.shuffleQuestions
      ? Math.floor(Math.random() * questions.length)
      : (questionNum + 1) % questions.length
    localStorage.setItem('questionNum', newQuestionNum)
    setQuestionNum(newQuestionNum)
    setChoices(Array(question.answers.length).fill(false))
    setResult(NOT_ANSWERED)
    setIsAnswered(false)
  }

  const answersOrder = () => {
    return options.shuffleAnswers ? Math.random() - 0.5 : 1
  }

  return (
    <>
      <Bar />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Quiz</h1>
          </Grid>
          <Grid item xs={12}>
            <h2>{question.question}</h2>
          </Grid>
          {getResult()}
          <Grid item xs={12}>
            <>
              <FormControl>
                {isSingleChoice ? (
                  <RadioGroup onChange={handleRadioChange}>
                    {question.answers.sort(answersOrder).map(a => (
                      <FormControlLabel
                        className={getFormLabelClass(a)}
                        key={a}
                        value={a}
                        control={<Radio />}
                        label={a}
                        disabled={isAnswered}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <FormGroup onChange={handleCheckboxChange}>
                    {question.answers.sort(answersOrder).map(a => (
                      <FormControlLabel
                        className={getFormLabelClass(a)}
                        key={a}
                        value={a}
                        control={<Checkbox />}
                        label={a}
                        disabled={isAnswered}
                      />
                    ))}
                  </FormGroup>
                )}

                {isAnswered ? (
                  <Button
                    onClick={handleNext}
                    style={{marginTop: '20px'}}
                    type="submit"
                    variant="contained"
                    color="primary">
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheck}
                    style={{marginTop: '20px'}}
                    type="submit"
                    variant="contained"
                    color="success">
                    Check
                  </Button>
                )}
              </FormControl>
            </>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Quiz
