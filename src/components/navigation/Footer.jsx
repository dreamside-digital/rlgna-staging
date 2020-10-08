import React from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const Footer = () => (
  <footer>
    <Container>
      <Grid container justify="space-between">
        <Grid item xs={6}>
          <p className="m-0"><a href="https://bmw-foundation.org/privacy-policy/" target="_blank" rel="noopener noreferrer" className="pretty-link">Privacy Policy</a></p>
        </Grid>
        <Grid item xs={6}>
          <p className="m-0 text-right">For further questions, please <a href="mailto:northamerica.network@bmw-foundation.org" className="pretty-link">contact our team</a>.</p>
        </Grid>
      </Grid>
    </Container>
  </footer>
)

export default Footer;
