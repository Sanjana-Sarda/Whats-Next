// Step 1: Import React
import * as React from 'react'
import * as style from '/src/components/home.module.css'
import MainApp from '/src/components/mainapp'
import Grid from '@material-ui/core/Grid'
// Step 2: Define your component
const IndexPage = () => {
  return (
    <body className={style.root}>
        <main>
          <Grid direction="row" justify="center" alignItems="center" >
           <MainApp />
          </Grid>
          
            
        </main>
    </body>
    
  )
}
// Step 3: Export your component
export default IndexPage