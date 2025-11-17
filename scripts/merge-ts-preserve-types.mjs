import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const visited = new Set()
const ordered = []

function resolveFile(filePath) {
  if (visited.has(filePath)) return
  visited.add(filePath)

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    process.exit(1)
  }

  const code = fs.readFileSync(filePath, 'utf8')

  const importRegex =
    /import\s+(?:[\s\S]*?)?from\s+["'](\.\/.*?|\.{2}\/.*?)["']/g
  let match

  while ((match = importRegex.exec(code))) {
    const resolved = resolveImport(filePath, match[1])
    if (resolved) resolveFile(resolved)
  }

  ordered.push(filePath)
}

function resolveImport(baseFile, reqPath) {
  const baseDir = path.dirname(baseFile)

  const candidates = [
    reqPath + '.ts',
    reqPath + '.tsx',
    reqPath + '.js',
    path.join(reqPath, 'index.ts'),
    path.join(reqPath, 'index.tsx')
  ]

  for (const candidate of candidates) {
    const abs = path.resolve(baseDir, candidate)
    if (fs.existsSync(abs)) return abs
  }

  return null
}

function merge(entryFile) {
  const absEntry = path.resolve(entryFile)
  resolveFile(absEntry)

  let output = ''

  // Prepend import * as modlib
  output += `// @ts-ignore\nimport * as modlib from 'modlib'\n`

  for (const file of ordered) {
    let code = fs.readFileSync(file, 'utf8')

    // Remove all import statements (semicolon optional)
    code = code.replace(/^\s*import\s.+from\s+['"].+['"]\s*;?\s*$/gm, '')

    // Remove export from classes, interfaces, types, enums, const/let/var (keep abstract)
    code = code.replace(
      /^\s*export\s+(abstract\s+)?(class|interface|type|enum|const|let|var)\b/gm,
      '$1$2'
    )

    // Remove named exports like: export { something }
    code = code.replace(/\bexport\s*{[^}]*}\s*;?\s*$/gm, '')

    // Remove default exports
    code = code.replace(/\bexport\s+default\s+/gm, '')

    output += `\n// -------- FILE: ${path.relative(process.cwd(), file)} --------\n`
    output += code + '\n'
  }

  const outputPath = path.resolve('merged.ts')
  fs.writeFileSync(outputPath, output)
  console.log(`✅ merged.ts generated at ${outputPath}`)
}

// Entry point
merge(path.resolve(__dirname, '../src/main.ts'))
