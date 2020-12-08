import { input, testInput } from './input.mjs';

const parseStringToGroups = (string) => {
    const groupStrings = string.split(/\n\n/);
    return groupStrings.map((groupString) => {
        const answersPerPerson = groupString
            .split(/\n/)
            .filter((answer) => answer);
        const uniqueAnswers = answersPerPerson.reduce((answers, person) => {
            person.split('').forEach((letter) => {
                if (!answers.includes(letter)) {
                    answers.push(letter);
                }
            });
            return answers;
        }, []);
        const sameAnswers = answersPerPerson.reduce((answers, person) => {
            if (answers === null) {
                return person.split('');
            }
            return answers.filter((answer) =>
                person.split('').includes(answer)
            );
        }, null);
        return {
            answersPerPerson,
            uniqueAnswers,
            sameAnswers,
        };
    });
};

console.log(
    'Answer one:',
    parseStringToGroups(input).reduce(
        (uniqueAnswersCount, group) =>
            uniqueAnswersCount + group.uniqueAnswers.length,
        0
    )
);

console.log(
    'Answer two:',
    parseStringToGroups(input).reduce(
        (sameAnswersCount, group) =>
            sameAnswersCount + group.sameAnswers.length,
        0
    )
);
