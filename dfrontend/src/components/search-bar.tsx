/* Current placeholder for a search bar that will allow users to search available projects*/

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import './data_tile.css'

const SearchBar = () => {
	
  return (
    <div>
        <TextField id="standard-basic" label="Standard" variant="standard" />
    </div>
  )
  
}

export default SearchBar;