import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const Footer = () => (
  <footer>
    <Container>
      <Grid container justify="space-between">
        <Grid item>
          <p className="m-0"><a href="https://bmw-foundation.org/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></p>
        </Grid>
        <Grid item>
          <p className="m-0">For further questions, please <a href="mailto:example@bmw-foundation.org">contact our team</a>.</p>
        </Grid>
      </Grid>
    </Container>
  </footer>
)

export default Footer;
