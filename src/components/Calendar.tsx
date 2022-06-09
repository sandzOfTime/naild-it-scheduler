import * as React from "react";
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";

import moment, { Moment } from "moment";

type Props = {
  date: Date | null;
  onChange: (value: any) => void;
  shouldDisableDate?: (day: Moment) => boolean;
};

const Calendar: React.FC<Props> = ({ date, onChange, shouldDisableDate }) => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={date}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} />}
        views={["day"]}
        minDate={moment()}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
