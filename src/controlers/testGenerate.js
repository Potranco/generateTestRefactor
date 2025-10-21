import testRepository from '../generators/testRepository.js'

export async function generarTest(req, res) {
  try {
    const { filePath, code, testSystem = 'jest' } = req.body;
    const response = testRepository(filePath, code, testSystem)
    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
}
