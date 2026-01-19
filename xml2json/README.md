# XML to JSON Converter

Transform XML documents into clean, readable JSON structures with ease.

## What's This About?

This project provides a simple yet powerful way to convert XML data into JSON format. It uses the **Adapter pattern** to handle the conversion, making it easy to extend with additional format converters in the future.

## Getting Started

### Basic Usage

```javascript
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
```

### Output

```json
{
  "bookstore": {
    "book": {
      "@category": "fantasy",
      "title": {
        "@lang": "en",
        "#text": "A Song of Ice and Fire"
      },
      "author": "George R. R. Martin"
    }
  }
}
```

## How It Works

### Key Features

- **Attributes**: XML attributes are preserved with an `@` prefix (e.g., `@category`, `@lang`)
- **Text Content**: Element text is stored in a `#text` property when mixed with attributes
- **Nested Elements**: Full support for deeply nested XML structures
- **Multiple Elements**: Duplicate element names automatically become arrays
- **Clean Conversion**: Handles whitespace and formatting gracefully

### Project Structure

```
xml2json/
├── main.js                          # Example usage
└── adapter/
    ├── Adapter.js                   # Base adapter class
    └── XmlToJsonAdapter.js          # XML-to-JSON implementation
```

### The Adapter Pattern

This project uses the **Adapter design pattern** for flexibility:

- **`Adapter.js`**: Base class that defines the interface for all converters
- **`XmlToJsonAdapter.js`**: Concrete implementation that converts XML to JSON

This makes it easy to add other converters (like XML to YAML, CSV to JSON, etc.) without changing existing code.

## Under the Hood

The converter works in three main steps:

1. **Parse Elements**: Recursively reads opening tags, attributes, and content
2. **Extract Attributes**: Isolates and prefixes all element attributes with `@`
3. **Build Structure**: Constructs the JSON object with proper nesting and array handling

## Examples

### Example 1: Simple XML
```xml
<person>
  <name>John Doe</name>
  <age>30</age>
</person>
```

Becomes:
```json
{
  "person": {
    "name": "John Doe",
    "age": "30"
  }
}
```

### Example 2: XML with Attributes
```xml
<person id="123" role="admin">
  <name>John Doe</name>
</person>
```

Becomes:
```json
{
  "person": {
    "@id": "123",
    "@role": "admin",
    "name": "John Doe"
  }
}
```

### Example 3: Duplicate Elements
```xml
<library>
  <book>Fiction</book>
  <book>Science</book>
</library>
```

Becomes:
```json
{
  "library": {
    "book": ["Fiction", "Science"]
  }
}
```

## Installation & Running

1. **Clone or download** this repository
2. **Navigate** to the project directory:
   ```bash
   cd xml2json
   ```
3. **Run the example**:
   ```bash
   node main.js
   ```

## Why Use This?

- ✅ **Lightweight**: No external dependencies
- ✅ **Predictable**: Consistent conversion rules
- ✅ **Extensible**: Easy to add new converters using the Adapter pattern
- ✅ **Educational**: Great for learning design patterns

## Notes

- Empty elements are preserved as empty objects
- Mixed content (text and child elements) stores text in `#text`
- All attribute values are strings
- The parser expects well-formed XML

## Future Enhancements

- Add support for XML namespaces
- Implement JSON to XML conversion
- Add options for attribute prefix customization
- Support CDATA sections


