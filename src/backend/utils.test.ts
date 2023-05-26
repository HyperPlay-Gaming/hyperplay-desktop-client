import { extractZip } from '../backend/utils'
import { createWriteStream, existsSync, readFileSync, rmSync } from 'fs'
import archiver from 'archiver'

describe('extractZip', () => {
  const zipFile = 'test.zip'
  const destinationPath = 'test'

  afterEach(() => {
    if (existsSync(zipFile)) {
      rmSync(zipFile)
    }
    if (existsSync(destinationPath)) {
      rmSync(destinationPath, { recursive: true })
    }
  })

  it('should extract a zip file', async () => {
    // Create a zip file with a single file
    const archive = archiver('zip')
    const output = createWriteStream(zipFile)
    archive.pipe(output)
    archive.append('Hello, world!', { name: 'file.txt' })
    archive.finalize()

    // Extract the zip file
    await extractZip(zipFile, destinationPath)

    // Check that the file was extracted
    const content = readFileSync(`${destinationPath}/file.txt`, 'utf8')
    expect(content).toBe('Hello, world!')
  })

  it('should extract a zip file with directories', async () => {
    // Create a zip file with directories and files
    const archive = archiver('zip')
    const output = createWriteStream(zipFile)
    archive.pipe(output)
    archive.append('Hello, world!', { name: 'file.txt' })
    archive.append('', { name: 'dir/' })
    archive.append('Hello, world in directory!', {
      name: 'dir/file_in_dir.txt'
    })
    archive.finalize()

    // Extract the zip file
    await extractZip(zipFile, destinationPath)

    // Check that the files were extracted

    const content1 = readFileSync(`${destinationPath}/file.txt`, 'utf8')
    expect(content1).toBe('Hello, world!')
    const content2 = readFileSync(`${destinationPath}/dir/file.txt`, 'utf8')
    expect(content2).toBe('Hello, world!')
  })

  it('should throw an error if the zip file does not exist', async () => {
    await expect(
      extractZip('nonexistent.zip', destinationPath)
    ).rejects.toThrow()
  })
})
