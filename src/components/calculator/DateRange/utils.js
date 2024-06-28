export const normalizeDate = (date, separator = ".") => {
    //  check if date is a valid date
    const isValidDate = date instanceof Date;

    if (!isValidDate) return "";

    const year = date.getFullYear();
    const month = date.getMonth() +1 < 10 ? `0${date.getMonth() +1}`: date.getMonth()+1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();



    return `${day}${separator}${month}${separator}${year}`;
}