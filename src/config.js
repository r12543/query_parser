const config = {
    assoc: {
        "and": "left",
        "or": "right"
    },
    prec: {
        "and": 3,
        "or": 2
    },
    operatorMappings: {
        "and": 0,
        "or": 1,
        "eq": 0,
        "gt": 1,
        "gte": 2,
        "lt": 3,
        "lte": 4
    },
    logicalOperators: /^and$|^or$/,
    comparisionOperators: /^eq$|^ne$|^lte$|^gte$|^gt$|^lt$|^not$/,
    leftParenthesis: /\(/,
    rightParenthesis: /\)/
};

module.exports = config;