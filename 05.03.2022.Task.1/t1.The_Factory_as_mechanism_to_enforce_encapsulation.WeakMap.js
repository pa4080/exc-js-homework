/* eslint-env es6 */
"use strict";

const _sensitive = new WeakMap();

const devFactory = function(name, salary) {
    const obj = {
        name,
        getSalary() {
            return _sensitive.get(this).salary;
        },
        increaseSalary(value, pwd) {
            if (pwd === _sensitive.get(this).pwd)
                _sensitive.get(this).salary += value;
            else
                console.log(`Wrong password! ${this.name} salary will not be increased!`);
        }
    };

    _sensitive.set(obj, {
        salary,
        pwd: 'abracadabra'
    });
    
    return obj;
};

const dev1 = devFactory('Peter', 1000);
const dev2 = devFactory('Maria', 1200);

console.log(`${dev1.name} salary is ${dev1.getSalary()}`);
console.log(`${dev2.name} salary is ${dev2.getSalary()}`);

dev1.increaseSalary(500, 'abracadabra');
dev2.increaseSalary(100, '123');

console.log(`${dev1.name} salary after promotion is ${dev1.getSalary()}`);
console.log(`${dev2.name} salary after promotion is ${dev2.getSalary()}`);

// *** OUTPUT ***
// Peter salary is 1000
// Maria salary is 1200

// Wrong password! Maria salary will not be increased!

// Peter salary after promotion is 1500
// Maria salary after promotion is 1200

console.log(dev1.name, _sensitive.get(dev1));
console.log(dev2.name, _sensitive.get(dev2));

// Peter {salary: 1500, pwd: 'abracadabra'}
// Maria {salary: 1200, pwd: 'abracadabra'}