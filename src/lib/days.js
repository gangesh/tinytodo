export const getTimeRemaining = (due) => {
    const date_now = new Date().getTime();
    const date_future = new Date(due).getTime();
    const unit = date_future < date_now ? 'neg' : 'pos';
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

export const isOverdue = (item) => {
    if (!item.due) { return false }
    const remaining = getTimeRemaining(item.due);
    return item.status === 'TODO' && remaining.unit === 'neg' && remaining.days > 1;
}

export const isDueNow = (item) => {
    if (!item.due) { return false }
    const remaining = getTimeRemaining(item.due);
    return item.status === 'TODO' && remaining.unit === 'neg' && (remaining.days === 1 || remaining.days === 0);
}

export const isDueSoon = (item) => {
    if (!item.due) { return false }
    const remaining = getTimeRemaining(item.due);
    return item.status === 'TODO' && remaining.unit === 'pos' && remaining.days <= 1;
}