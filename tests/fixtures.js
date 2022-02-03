const constants = {
	QUERY_STRINGS: [{
		"query": "(ab gt 3 and ab lt 5) or ab gt 10",
		"tokens_length": 13,
		"num_parentheses": 2,
		"num_clauses": 3,
		"num_log_ops": 2
	}, {
		"query": "(ab gt 2 and ab lt 4) or (ab gt 5 and ab lt 7)",
		"tokens_length": 19,
		"num_parentheses": 4,
		"num_clauses": 4,
		"num_log_ops": 3
	}, {
		"query": "((ab gt 2 and ab lt 4) or ab gt 5)",
		"tokens_length": 15,
		"num_parentheses": 4,
		"num_clauses": 3,
		"num_log_ops": 2
	}, {
		"query": "((ab gt 2 and ab lt 4)) or (ab gt 5)",
		"tokens_length": 17,
		"num_parentheses": 6,
		"num_clauses": 3,
		"num_log_ops": 2
	}, {
		"query": "ab gt 2",
		"tokens_length": 3,
		"num_parentheses": 0,
		"num_clauses": 1,
		"num_log_ops": 0
	}, {
		"query": "(ab gt 2)",
		"tokens_length": 5,
		"num_parentheses": 2,
		"num_clauses": 1,
		"num_log_ops": 0
	}, {
		"query": "((((ab gt 2))))",
		"tokens_length": 11,
		"num_parentheses": 8,
		"num_clauses": 1,
		"num_log_ops": 0
	}, {
		"query": "(ab gt 2 and ab lt 4)",
		"tokens_length": 9,
		"num_parentheses": 2,
		"num_clauses": 2,
		"num_log_ops": 1
	}, {
		"query": "(ab gt 2) and (ab lt 4)",
		"tokens_length": 11,
		"num_parentheses": 4,
		"num_clauses": 2,
		"num_log_ops": 1
	}, {
		"query": "((ab gt 2) and (ab lt 4))",
		"tokens_length": 13,
		"num_parentheses": 6,
		"num_clauses": 2,
		"num_log_ops": 1
	}, {
		"query": "(ab gt 2 and ab lt 4) or ab gt 5 and (ab ne 5) or bcadasd eq 12341234 and title eq rajat",
		"tokens_length": 27,
		"num_parentheses": 4,
		"num_clauses": 6,
		"num_log_ops": 5
	},
	{
		"query": "(title eq 'Rajat chaudhary IV-X' or title eq Narendra Modi) and (title eq Politics in India)",
		"tokens_length": 15,
		"num_parentheses": 4,
		"num_clauses": 3,
		"num_log_ops": 2
	}
	],
	INVALID_QUERIES: [
		"ab ( eq ( lte ()",
		"ab eq ads and (((ab eq safds) or (asdf eq saf)",
		"()()()()",
		"(((())))",
		"()",
		"(((((((((",
		"))))))",
		"AB eq",
		"eq asfsf",
		"fdkahds asddkjfha",
		"(a eq b or a eq c) and",
		"(kahf lte sdfa) or safkhaseq eq "
	],
};

module.exports = constants;