import createTestFile from '../generators/createTestFile.js'

export async function generarTest(req, res) {
  try {
    const { filePath, code, testSystem = 'jest' } = req.body;
    const response = createTestFile(filePath, code, testSystem)
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
