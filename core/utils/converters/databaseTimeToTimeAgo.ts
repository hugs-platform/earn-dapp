import { format } from "date-fns";

export const toTimeAgo = (time: number) => {
  const currentTime: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
  const timeLastUpdated: number = time;

  // the time in seconds between current currentTime and timeLastUpdated
  const timeBetween: number = (new Date(currentTime).getTime() - new Date(timeLastUpdated).getTime()) / 1000;

  // all time variables
  const days = Math.floor(timeBetween / 86400);
  const hours = Math.floor((timeBetween - days * 86400) / 3600);
  const minutes = Math.floor((timeBetween - days * 86400 - hours * 3600) / 60);
  const seconds = Math.trunc(timeBetween - days * 86400 - hours * 3600 - minutes * 60);

  // gives the time variables 2 numbers at all times. example: 7 min -> 07 min
  const giveTimeTwoNumbers = (eachTime: number) => {
    const convertToTwoNumbers = eachTime.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return convertToTwoNumbers;
  };

  // groups all time variables after they've been converted
  const totalTimeFromLastUpdate = giveTimeTwoNumbers(hours) + ":" + giveTimeTwoNumbers(minutes) + ":" + giveTimeTwoNumbers(seconds);

  // return formatDistanceToNow(new Date(time), { includeSeconds: true, addSuffix: true });
  return totalTimeFromLastUpdate;
};