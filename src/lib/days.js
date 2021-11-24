import dayjs from 'dayjs';

console.log('day', dayjs().format());

export const getTimeRemaining = (item) => {
    const date_now = new Date().getTime();
    const date_future = new Date(item.createdOn).getTime();
    const unit = date_future < date_now ? 'pos' : 'neg';
    // get total seconds between the times
    var delta = Math.abs(date_future - date_now) / 1000;
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    var seconds = Math.floor(delta % 60)
    return {days,hours,minutes,seconds,unit}
}