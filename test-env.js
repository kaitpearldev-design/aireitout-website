const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
const line = lines.find(l => l.startsWith('FIREBASE'));
console.log(line ? line.substring(0, 80) : 'NOT FOUND');
```
