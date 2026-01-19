const XmlToJsonAdapter = require("./adapter/XmlToJsonAdapter");

const xml = `
<bookstore>
  <book category="fantasy">
    <title lang="en">A Song of Ice and Fire</title>
    <author>George R. R. Martin</author>
  </book>
</bookstore>
`;

const adapter = new XmlToJsonAdapter();
const json = adapter.convert(xml);

console.log(JSON.stringify(json, null, 2));
