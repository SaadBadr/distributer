const fs = require("fs");

class person {
  constructor(name, ...money) {
    this.name = name;
    this.money = money.reduce((a, b) => a + b, 0);
  }
}

let people = JSON.parse(fs.readFileSync("input.json", { encoding: "utf-8" }));

people = Object.entries(people).map((el) => new person(el[0], ...el[1]));

people = people.sort((a, b) => b.money - a.money);

let average_money = 0;
people.forEach((el) => (average_money += el.money));
console.log("total_money", average_money);
average_money = Math.round(average_money / people.length);

let above_avg = [];
let below_avg = [];

people.forEach((el) => {
  if (el.money > average_money) above_avg.push(el);
  else below_avg.push(el);
});

above_avg.forEach((el) => (el.money -= average_money));
below_avg.forEach((el) => (el.money = average_money - el.money));

console.log("average_money", average_money);
console.log("-------------------------------------------------");

console.log("Pay:");
console.log(below_avg);

console.log("-------------------------------------------------");

console.log("Get Paid:");
console.log(above_avg);
