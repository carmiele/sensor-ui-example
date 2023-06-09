/**
 * Transforms date or datestring into proper 
 * format accepted by <input type="date"/>
 * @param date
 * @returns 
 */
export const formatDate = (date: Date | string): string => {
    date = new Date(date);
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}