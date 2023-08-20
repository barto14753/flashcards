import React, { useState } from "react";
import Bar from "./Bar";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  goodAnswer: {
    background: "#66bb6a",
    paddingRight: "25px",
    marginTop: "15px",
    borderRadius: "5px",
    color: "white",
  },

  wrongAnswer: {
    background: "#f44336",
    paddingRight: "25px",
    marginTop: "15px",
    borderRadius: "5px",
    color: "white",
  },
}));

const Quiz = () => {
  const classes = useStyles();

  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || [],
  );

  const [questionNum, setQuestionNum] = useState(
    parseInt(localStorage.getItem("questionNum")) || 0,
  );

  const [isAnswered, setIsAnswered] = useState(false);

  const question = questions[questionNum];
  const isSingleChoice = question.correct.length === 1;

  const getFormLabelClass = (answer) => {};

  const handleCheck = () => {
    setIsAnswered(true);
  };

  const handleNext = () => {};

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
          <Grid item xs={12}>
            <>
              <FormControl>
                {isSingleChoice ? (
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {question.answers.map((a) => (
                      <FormControlLabel
                        className={classes.customFormControlLabel}
                        value={a}
                        control={<Radio />}
                        label={a}
                      />
                    ))}
                  </RadioGroup>
                ) : (
                  <FormGroup>
                    {question.answers.map((a) => (
                      <FormControlLabel
                        className={classes.customFormControlLabel}
                        value={a}
                        control={<Checkbox />}
                        label={a}
                      />
                    ))}
                  </FormGroup>
                )}

                {isAnswered ? (
                  <Button
                    onClick={handleNext}
                    style={{ marginTop: "20px" }}
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheck}
                    style={{ marginTop: "20px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Check
                  </Button>
                )}
              </FormControl>
            </>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Quiz;
