import React, { useState } from 'react';
import { Stack, TextField } from '@mui/material';

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const MuiPicker = ( props ) => {
    const [selectedDate, setSelectedDate] = useState(Date.now)
    
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Release date"
        value={selectedDate}
        inputFormat="MMM DD, YYYY"
        onChange={(newValue) => {
          setSelectedDate(newValue);
          props.setReleaseInput(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      
    </LocalizationProvider>
    
    </>
    
  )
}
