export const getFormattedCurrentDate = (date: Date = new Date()): string => {
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', {month: 'long'});
    const weekday = date.toLocaleDateString('en-US', {weekday: 'short'});

    return `${day} ${month}, ${weekday}`;
};