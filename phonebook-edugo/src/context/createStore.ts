import { v4 as uuidv4 } from "uuid";

export interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

const names = [
  "Yoda",
  "Jack Sparrow",
  "Captain Kirk",
  "Spock",
  "Optimus Prime",
  "Gandalf",
  "Inigo Montoya",
  "Magneto",
  "Tony Stark",
  "Bilbo Baggins",
  "Legolas",
  "Inspector Clouseau",
  "Obi Wan",
];

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: uuidv4(),
    name: names[Math.floor(Math.random() * names.length)],
    age: Math.floor(Math.random() * 50),
    address: `HongQiao Road # ${Math.floor(Math.random() * 50)}`,
  });
}

export function createStore() {
  return {
    originData: originData as Item[],
  };
}

export type TStore = ReturnType<typeof createStore>;
