import path from 'path';
import compiler from '../src/compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler(path.join(__dirname, 'example.txt'));
  const output = stats.toJson().modules[0].source;

  expect(output).toBe('export default "Hey Alice!"');
});