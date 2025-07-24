   import React from 'react'
import {Banner} from '../banner/Banner.jsx'
import ImageSlider from './slider.jsx'
import { Categories } from './Categories.jsx'
import { Grid } from '@mui/material'

   export const Home = () =>{
     return (
       <>
           <Banner/>
           <Grid container>
               <Grid item lg={2} sm={2} xs={12} >
                  <Categories />
               </Grid>
               <Grid container item xs={12} sm={10} lg={10}>
                   Posts
               </Grid>
           </Grid>
           <ImageSlider/>
       </>
     )
   }
   
   