import React from 'react'
import { Banner } from '../banner/Banner.jsx'
import ImageSlider from './slider.jsx'
import { Categories } from './Categories.jsx'

export const Home = () => {
  return (
    <>
      <Banner />
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/6">
          <Categories />
        </div>
        <div className="w-full lg:w-5/6 p-4">
          Posts
        </div>
      </div>
      <ImageSlider />
    </>
  )
}
