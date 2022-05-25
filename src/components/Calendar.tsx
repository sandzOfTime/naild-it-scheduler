import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

type Props = {
  date: Date | null;
  onChange: (value: any) => void;
};

const Calendar: React.FC<Props> = ({ date, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={date}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        views={["day"]}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
