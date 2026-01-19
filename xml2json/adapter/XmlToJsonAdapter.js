const Adapter = require("./Adapter");

class XmlToJsonAdapter extends Adapter {

  convert(xml) {
    xml = xml.trim();
    const [result] = this._parseElement(xml);
    return result;
  }

  _parseElement(xml) {
    const tagMatch = xml.match(/^<([\w:-]+)([^>]*)>/);
    if (!tagMatch) return [null, ""];

    const tag = tagMatch[1];
    const attrString = tagMatch[2];
    const attrs = this._parseAttributes(attrString);

    const closeTag = `</${tag}>`;
    const innerStart = tagMatch[0].length;
    const innerEnd = xml.indexOf(closeTag);
    let inner = xml.slice(innerStart, innerEnd).trim();

    const node = {};
    Object.entries(attrs).forEach(([k, v]) => {
      node[`@${k}`] = v;
    });

    while (inner.startsWith("<")) {
      const [child, rest] = this._parseElement(inner);
      const childTag = Object.keys(child)[0];
      const childValue = child[childTag];

      if (node[childTag]) {
        if (!Array.isArray(node[childTag])) {
          node[childTag] = [node[childTag]];
        }
        node[childTag].push(childValue);
      } else {
        node[childTag] = childValue;
      }

      inner = rest.trim();
    }

    if (inner && !inner.startsWith("<")) {
      if (Object.keys(node).length === 0) {
        return [{ [tag]: inner }, xml.slice(innerEnd + closeTag.length)];
      }
      node["#text"] = inner;
    }

    return [
      { [tag]: node },
      xml.slice(innerEnd + closeTag.length)
    ];
  }

  _parseAttributes(str) {
    const attrs = {};
    const regex = /([\w:-]+)="([^"]*)"/g;
    let match;
    while ((match = regex.exec(str))) {
      attrs[match[1]] = match[2];
    }
    return attrs;
  }
}

module.exports = XmlToJsonAdapter;
