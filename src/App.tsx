import React from 'react';
import {AlertExample} from "./Alert/AlertExample";
import {Container, Grid, Typography} from "@mui/material";
import {AlertManager} from "./Alert/AlertManager";

function App() {
  return (
      <Container maxWidth={'xs'} >
          <Grid container spacing={3} justifyContent={'center'} pt={8}>
            <Grid item xs={12} >
                <Typography variant={'h4'} color={'primary'} align={'center'}>Alert Example</Typography>
            </Grid>
              <Grid item xs={12}>
                  <AlertManager />
                  <AlertExample />
            </Grid>
          </Grid>
      </Container>
  );
}

export default App;
