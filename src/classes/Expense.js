import moment from "moment";

export default class Expense {
  constructor(id, description, value, installments, date) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.installments = installments;
    this.installmentValue = parseFloat((value / installments).toFixed(2));
    this.creationDate = moment(date);
    this.start = this.creationDate.format("YYYY-MM-DD");
    if (this.creationDate.date() >= 19)
      this.start = moment(this.start)
        .add(1, "months")
        .date(18)
        .format();
    this.end = moment(this.start)
      .add(installments - 1, "months")
      .date(19)
      .format("YYYY-MM-DD");
  }
}
