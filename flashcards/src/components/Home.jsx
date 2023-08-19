import React from 'react'
import Bar from './Bar'
import ReactMarkdown from 'react-markdown'

const markdown = `
# Project \`flashcards\`
[![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)]()

\`flashcards\` is react app for learning purposes

👉 Create set of questions

👉 Upload them

👉 Start learning

## Flashcards
At first you need to prepare text file with your questions

\`\`\`txt
=When II World War started?
==1938
==>1939
==1940
=Which equations equals 4?
==>2+2
==2%2
==>2*2
==>2^2
=Which equations equals 3?
==>2+1
==3%3
==>3*1
==>4-2

\`\`\`

`

const Home = () => {

  const containerStyles = {
    color: 'black',
    padding: '25px',
  };

  return (
    <>
      <Bar />
      <div style={containerStyles}>
      <ReactMarkdown 
        children={markdown} 
      />
      </div>
    </>
  )
}

export default Home
