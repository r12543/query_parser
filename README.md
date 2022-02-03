# Query Parser

- The function `parse` in `src/parser.js` parses a string which can have a filter string which is generally used in api query parameters and returns an AST which can further be used to build database queries.
- This parser is based on expression parser logic and has associativity and prcendence defined for the operators.
- Query Examples:
    - `(ab gt 3 and ab lt 5) or ab gt 10`
    - `(ab gt 2) and (ab lt 4)`
- AST for `(ab gt 2) and (ab lt 4)` would be:
    ```
             and
         /         \
        gt         lt
      /    \     /    \
     ab    2    ab     4
    ```
- To run tests:
    - `npm install`
    - `npm test`