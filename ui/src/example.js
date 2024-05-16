export default `
flowchart TD
    A[Start] --> B{Is 'arr' empty?}
    B -->|No| C{Loop through 'arr'}
    C --> D{Current element == x?}
    D -->|Yes| E(Return index 'i')
    E --> F[End]
    D -->|No| C
    B -->|Yes| G(Return -1)
    G --> F
    F[End]
`;
