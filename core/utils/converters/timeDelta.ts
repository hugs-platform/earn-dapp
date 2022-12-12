import moment from "moment";

export const findTimeDelta = (dateToFind: string) => {
    var now = moment(moment().utc());
    var second_date = moment(Date.parse(dateToFind));
    var diffDuration = moment.duration(now.diff(second_date));
    if (diffDuration.years() > 0) {
        return diffDuration.years() + " years ago";
    } else if (diffDuration.months() > 0) {
        return diffDuration.months() + " months ago";
    } else if (diffDuration.weeks() > 0) {
        return  diffDuration.weeks() + " weeks ago";
    } else if (diffDuration.days() > 0) {
        return diffDuration.days() + " days ago";
    } else if (diffDuration.hours() > 0) {
        return diffDuration.hours() + " hours ago";
    } else {
        return diffDuration.minutes() + " minutes ago";
    }
};
