#!/usr/bin/env node
import { transform } from '@svgr/core'
import fs from 'fs/promises'
import path from 'path'

const OUT_ROOT = 'dist'

/** Converts kebab-case or snake_case to PascalCase */
function toPascalCase(name) {
    return name
        .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
        .replace(/^\w/, (c) => c.toUpperCase())
}

/** Builds React components from svgs */
async function buildReactComponents(inputDir, outputDir) {
    console.log(`Processing directory ${inputDir}`)
    const files = await fs.readdir(inputDir)

    await fs.mkdir(outputDir, { recursive: true })
    console.log(`Created outputDir ${outputDir}`)

    /** Lines to write into index.js and index.d.ts */
    const exportLines = []
    const typedefLines = []

    for (const file of files) {
        if (!file.endsWith('.svg')) {
            console.log(`Skipped file ${file}: Incorrect file type not .svg`)
            continue
        }

        const baseName = path.basename(file, '.svg')
        const componentName = toPascalCase(baseName)
        const svgPath = path.join(inputDir, file)
        const outPath = path.join(outputDir, `${baseName}.js`)

        const rawSvg = await fs.readFile(svgPath, 'utf-8')

        const componentCode = await transform(
            rawSvg,
            {
                icon: true,
                jsxRuntime: 'automatic',
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                svgoConfig: {
                    plugins: [
                        { name: 'removeViewBox', active: false },
                        { name: 'removeAttrs', params: { attrs: '(class|style)' } },
                        {
                            name: 'addAttributesToSVGElement',
                            params: { attributes: [{ fill: 'currentColor' }] }
                        }
                    ]
                }
            },
            { componentName }
        )

        await fs.writeFile(outPath, componentCode)
        exportLines.push(`export { default as ${componentName} } from './${baseName}.js'`)
        typedefLines.push(`\texport const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>>`)
        console.log(`Created component ${componentName} to path ${outPath}`)
    }
    await fs.writeFile(path.join(outputDir, 'index.js'), exportLines.join('\n'))
    console.log(`Wrote index.js to ${outputDir}`)

    return { typedefLines }
}

async function run() {
    const [icons, logos] = await Promise.all([
        buildReactComponents('assets/icons', path.join(OUT_ROOT, 'icons-react')),
        buildReactComponents('assets/logos', path.join(OUT_ROOT, 'logos-react'))
    ])

    const dtsLines = [
        '/// <reference types="react" />',
        '',
        `declare module '@prodeko/visual-assets/react/icons' {`,
        ...icons.typedefLines,
        '}',
        '',
        `declare module '@prodeko/visual-assets/react/logos' {`,
        ...logos.typedefLines,
        '}',
        ''
    ]

    await fs.writeFile('react-components.d.ts', dtsLines.join('\n'))
}

run()
