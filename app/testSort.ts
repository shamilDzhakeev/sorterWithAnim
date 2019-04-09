class User {
  name: string;

  age: number;

  constructor(_name: string, _age: number) {
    this.name = _name;
    this.age = _age;
  }
}
const tom: User = new User('Том', 29);
console.log(tom.name, tom.age);

// ES6 features

const msg: string = 'Template Literals';
const ES6: string = `ES6 feature is ${msg}`;

const arrFunc = () => 'Hello im arrow func!';
console.log(arrFunc());
