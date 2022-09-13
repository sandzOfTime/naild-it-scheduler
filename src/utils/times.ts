import moment from "moment";

export const calculateEndTime = (duration: string, time: Date):Date => {
    let amount = Number(duration.split(" ")[0]);
    
    return duration.split(" ")[1] === 'min' ? moment(time).add(amount, 'm').toDate() : moment(time).add(amount, 'h').toDate();
}