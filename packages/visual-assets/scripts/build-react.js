#!/usr/bin/env node
import { transform } from '@svgr/core'
import fs from 'fs/promises'
import path from 'path'
import babel from '@babel/core'

const OUT_ROOT = 'dist'

/** Converts kebab-case or snake_case to PascalCase */
function toPascalCase(name) {
    return name
        .replace(/[-_](.)/g, (_, c) => c.toUpperCase())
        .replace(/^\w/, (c) => c.toUpperCase())
}

/** Precompile JSX react components with babel to make package usage simpler */
async function compileWithBabel(code) {
    const result = await babel.transformAsync(code, {
        presets: ['@babel/preset-react'],
        plugins: [],
        filename: 'file.js',
        babelrc: false,
        configFile: false,
        compact: false,
    })
    return result.code
}

/** Builds React components from svgs */
async function buildReactComponents(inputDir, outputDir, packageExportsPath) {
    console.log(`Processing directory ${inputDir}`)
    const files = await fs.readdir(inputDir)

    await fs.mkdir(outputDir, { recursive: true })
    console.log(`Created outputDir ${outputDir}`)

    /** Lines to write into index.js and index.d.ts */
    const exportLines = []
    const typedefLines = [
        '/// <reference types="react" />',
        '',
        `declare module '@prodeko/visual-assets/${packageExportsPath}' {`,
    ]

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

        const reactJsxCode = await transform(
            rawSvg,
            {
                icon: true,
                jsxRuntime: 'classic',
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                svgoConfig: {
                    plugins: [
                        'preset-default',
                        'removeEditorsNSData',
                        'removeXMLNS',
                        'removeStyleElement',
                        { name: 'removeViewBox', active: false }, // keep viewBox
                        { name: 'removeDimensions', active: true }, // allow styling with CSS
                        { name: 'removeAttrs', params: { attrs: ['fill', 'stroke', 'style'] } },
                        {
                            name: 'addAttributesToSVGElement',
                            params: { attributes: [{ fill: 'currentColor' }] }
                        }
                    ]
                }
            },
            { componentName }
        )

        const compiledJSCode = await compileWithBabel(reactJsxCode)
        await fs.writeFile(outPath, compiledJSCode)
        exportLines.push(`export { default as ${componentName} } from './${baseName}.js'`)
        typedefLines.push(`\texport const ${componentName}: React.FC<React.SVGProps<SVGSVGElement>>`)
        console.log(`Created component ${componentName} to path ${outPath}`)
    }
    typedefLines.push('}')
    await fs.writeFile(path.join(outputDir, 'index.js'), exportLines.join('\n'))
    await fs.writeFile(path.join(outputDir, 'index.d.ts'), typedefLines.join('\n'))
    console.log(`Wrote index.js, index.d.ts to ${outputDir}`)
}

async function run() {
    await Promise.all([
        buildReactComponents('assets/icons', path.join(OUT_ROOT, 'icons-react'), 'react/icons'),
        buildReactComponents('assets/logos', path.join(OUT_ROOT, 'logos-react'), 'react/logos')
    ])
}

run()
