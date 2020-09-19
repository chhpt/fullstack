export default function loader(source) {
  source = source.replace(/\[name\]/g, 'Alice');
  return `export default ${JSON.stringify(source)}`;
}
