import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix __dirname in ES module
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
        /import\s+(?:[\s\S]*?)?from\s+["'](\.\/.*?|\.{2}\/.*?)["'];?/g
    let match
    while ((match = importRegex.exec(code))) {
        const importPath = match[1]
        const resolved = resolveImport(filePath, importPath)
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
        path.join(reqPath, 'index.tsx'),
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

    // Add modlib import at the very top
    output += `import * as modlib from 'modlib'\n`

    for (const file of ordered) {
        let code = fs.readFileSync(file, 'utf8')

        // Remove all import statements (we already added modlib at the top)
        code = code.replace(/^\s*import\s+.*from\s+['"].+['"]\s*;?\s*$/gm, '')

        // Remove 'export' from classes, types, const/let/var, including abstract classes
        code = code.replace(
            /^\s*export\s+(abstract\s+)?(?=class|interface|type|enum|const|let|var)/gm,
            '$1'
        )

        output += `\n// -------- FILE: ${path.relative(
            process.cwd(),
            file
        )} --------\n`
        output += code + '\n'
    }

    const outputPath = path.resolve('merged.ts')
    fs.writeFileSync(outputPath, output)
    console.log(`✅ merged.ts generated at ${outputPath}`)
}

// ======= ENTRY POINT =======
merge(path.resolve(__dirname, '../src/main.ts'))
