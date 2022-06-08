import moment from "moment";
import { supabase } from "./supabaseClient";


export const getAvailableTimes = async (date: any) => {
    const { data: StoreHours, error } = await supabase
        .from('StoreHours')
        .select('*')
    
    if (error) return [];

    const selected_day = StoreHours?.find((sh) => sh?.day_index === moment(date).day())

    let start = moment(date).hour(selected_day?.start_time).minute(0);
    let avail_times = []

    while (start < moment(date).hour(selected_day?.end_time).minute(0)) {
        avail_times.push(start.toDate());
        start = moment(start).add(30, 'm')
    }

    return avail_times.map((time) => {
        return {time_slot: moment(time).format('h:mm a'), actual_time: time}
    });
    
}