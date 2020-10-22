export const dateToNum = (date: string) => {
    let dateAsNumber: number;
    if (!date) {
      dateAsNumber = 0;
    } else {
      dateAsNumber = Number(date.replace(/-/g, ''));
    }
    return dateAsNumber;
  }