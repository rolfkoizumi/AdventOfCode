import { input, testInput, validInput, invalidInput } from './input.mjs';

const parseStringToPassports = (rawString) => {
    const passports = rawString.split(/\n\n/);
    return passports.map((passport) => {
        return passport.split(/\s+/).reduce((obj, keyValue) => {
            if (keyValue) {
                obj[keyValue.split(':')[0]] = keyValue.split(':')[1];
            }
            return obj;
        }, {});
    });
};

const validateRule = (obj, rule) => {
    let valid = true;
    if (rule.hasOwnProperty('length')) {
        valid = valid && obj[rule.field].length === rule.length;
    }
    if (rule.hasOwnProperty('min')) {
        valid = valid && parseInt(obj[rule.field]) >= rule.min;
    }
    if (rule.hasOwnProperty('max')) {
        valid = valid && parseInt(obj[rule.field]) <= rule.max;
    }
    if (rule.hasOwnProperty('contains')) {
        valid = valid && obj[rule.field].includes(rule.contains);
    }
    if (rule.hasOwnProperty('oneOf')) {
        valid = valid && rule.oneOf.some((value) => obj[rule.field] === value);
    }
    if (rule.hasOwnProperty('regex')) {
        valid = valid && (obj[rule.field].match(rule.regex) || []).length;
    }
    return valid;
};

const validateRules = (obj, rules) => {
    if (!rules.length) {
        return true;
    }

    return rules.every((ruleOrArray) => {
        if (Array.isArray(ruleOrArray)) {
            return ruleOrArray.some((rule) => validateRule(obj, rule));
        } else {
            return validateRule(obj, ruleOrArray);
        }
    });
};

const validatePassport = (passport, rules = [], cidOptional = true) => {
    const mandatoryKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    let valid = true;
    valid = valid && mandatoryKeys.every((key) => passport.hasOwnProperty(key));
    valid = valid && (cidOptional ? true : passport.hasOwnProperty('cid'));
    valid = valid && validateRules(passport, rules);
    return valid;
};

const rules = [
    { field: 'byr', length: 4, min: 1920, max: 2002 },
    { field: 'iyr', length: 4, min: 2010, max: 2020 },
    { field: 'eyr', length: 4, min: 2020, max: 2030 },
    [
        { field: 'hgt', contains: 'cm', min: 150, max: 193 },
        { field: 'hgt', contains: 'in', min: 59, max: 76 },
    ],
    { field: 'hcl', regex: /^#[a-fA-F0-9]{6}$/ },
    { field: 'ecl', oneOf: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'] },
    { field: 'pid', regex: /^[0-9]{9}$/ },
];

const data = parseStringToPassports(input);

const validPassportCount = data.reduce(
    (count, passport) => count + validatePassport(passport),
    0
);
console.log('Answer one:', validPassportCount);

const validPassportCount2 = data.reduce(
    (count, passport) => count + validatePassport(passport, rules),
    0
);
console.log('Answer two:', validPassportCount2);
