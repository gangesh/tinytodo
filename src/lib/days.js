import moment from 'moment';

export const getTimeRemaining = (due, suffix = false) => {
    if (!due) { return '' };
    return moment(due).locale("en").fromNow(suffix);
}

export const isOverdue = (item) => {
    if (!item.due || item.status !== 'TODO') { return false }
    const remaining = getTimeRemaining(item.due);
    return remaining.indexOf('ago') !== -1;
}

export const isDueNow = (item) => {
    if (!item.due || item.status !== 'TODO') { return false }
    const remaining = getTimeRemaining(item.due);
    return remaining.indexOf('in') !== -1 && (
        remaining.indexOf('hour') !== -1 ||
        remaining.indexOf('minute') !== -1 ||
        remaining.indexOf('second') !== -1
    );
}

export const isDueSoon = (item) => {
    if (!item.due || item.status !== 'TODO') { return false }
    const remaining = getTimeRemaining(item.due);
    return remaining.indexOf('in a day') !== -1 ||
        remaining.indexOf('in 2 days') !== -1 ||
        remaining.indexOf('in 3 days') !== -1;
}