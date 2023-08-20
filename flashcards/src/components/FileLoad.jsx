import {Grid} from '@mui/material'
import React from 'react'
import {CopyBlock, monokaiSublime} from 'react-code-blocks'
import {DropzoneArea} from 'react-mui-dropzone'

const code = `# Example flashcard

=When II World War started?
==1938
==>1939
==1940
=Which equations equals 4?
==>2+2
==2%2
==>2*2
==>2^2`

const FileLoad = () => {
  const loadFile = files => {
    const file = files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = function (event) {
        const content = event.target.result
        const questions = parseQuestions(content)
        localStorage.setItem('questions', JSON.stringify(questions))
      }

      reader.readAsText(file)
    }
  }

  const parseQuestions = rawLines => {
    console.log(rawLines)
    const lines = rawLines.split('\n')
    let questions = []
    let currentQuestion = {}
    lines.forEach((line, index) => {
      if (line.startsWith('==>')) {
        const answer = line.split('==>')[1]
        currentQuestion.correct.push(currentQuestion.answers.length)
        currentQuestion.answers.push(answer)
      } else if (line.startsWith('==')) {
        const answer = line.split('==')[1]
        currentQuestion.answers.push(answer)
      } else if (line.startsWith('=')) {
        const question = line.split('=')[1]

        if (currentQuestion.question) {
          questions.push(currentQuestion)
        }
        currentQuestion = {
          id: questions.length,
          question: question,
          answers: [],
          correct: [],
        }
      }
    })
    if (currentQuestion.question) {
      questions.push(currentQuestion)
    }
    return questions
  }
  return (
    <Grid
      justifyContent="center"
      alignItems="center"
      style={{height: '100vh', padding: '30px'}}>
      <Grid item>
        <CopyBlock
          text={code}
          language={'js'}
          showLineNumbers={true}
          theme={monokaiSublime}
          wrapLines
        />
      </Grid>

      <Grid item>
        <DropzoneArea
          acceptedFiles={['text/*']}
          filesLimit={1}
          useChipsForPreview={true}
          showFileNames={true}
          showFileNamesInPreview={true}
          dropzoneText="Drop here config"
          onChange={loadFile}
        />
      </Grid>
    </Grid>
  )
}

export default FileLoad
