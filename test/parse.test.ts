import assert from 'node:assert/strict'
import { test } from 'node:test'
import JSZip from 'jszip'
import { classifyFile, htmlToText, parseFile, SkipFile } from '../src/parse.ts'

/** Build a one-page-per-entry PDF with Helvetica text and a correct xref table. */
export function makePdf(pages: readonly string[]): Uint8Array {
  const objects: string[] = []
  const pageIds = pages.map((_, i) => 4 + i * 2)
  objects[1] = '<< /Type /Catalog /Pages 2 0 R >>'
  objects[2] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pages.length} >>`
  objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
  pages.forEach((text, i) => {
    const stream = `BT /F1 18 Tf 72 720 Td (${text.replace(/[()\\]/g, '\\$&')}) Tj ET`
    objects[pageIds[i]!] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 3 0 R >> >> /Contents ${pageIds[i]! + 1} 0 R >>`
    objects[pageIds[i]! + 1] = `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`
  })
  let body = '%PDF-1.4\n'
  const offsets: number[] = []
  for (let id = 1; id < objects.length; id++) {
    offsets[id] = body.length
    body += `${id} 0 obj\n${objects[id]}\nendobj\n`
  }
  const xref = body.length
  body += `xref\n0 ${objects.length}\n0000000000 65535 f \n`
  for (let id = 1; id < objects.length; id++) body += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`
  body += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`
  return new TextEncoder().encode(body)
}

export async function makeDocx(paragraphs: readonly string[]): Promise<Uint8Array> {
  const zip = new JSZip()
  zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>')
  zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')
  const runs = paragraphs.map((text) => `<w:p><w:r><w:t>${text}</w:t></w:r></w:p>`).join('')
  zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${runs}</w:body></w:document>`)
  return zip.generateAsync({ type: 'uint8array' })
}

test('classification covers docs and code, and refuses secrets, lockfiles and binaries', () => {
  assert.equal(classifyFile('/a/README.md'), 'markdown')
  assert.equal(classifyFile('/a/src/main.rs'), 'text')
  assert.equal(classifyFile('/a/Dockerfile'), 'text')
  assert.equal(classifyFile('/a/manual.PDF'), 'pdf')
  assert.equal(classifyFile('/a/spec.docx'), 'docx')
  assert.equal(classifyFile('/a/page.html'), 'html')
  for (const name of ['.env', '.env.local', 'id_rsa', 'server.key', 'credentials.json', 'aws-secrets.yaml', 'package-lock.json', 'app.min.js', 'photo.png']) {
    assert.equal(classifyFile(`/a/${name}`), undefined, name)
  }
  assert.equal(classifyFile('/a/notes.log'), undefined)
  assert.equal(classifyFile('/a/notes.log', ['log']), 'text')
})

test('text parsing rejects binary content and strips HTML', async () => {
  await assert.rejects(parseFile('text', new Uint8Array([104, 0, 105])), SkipFile)
  assert.match(htmlToText('<p>A&amp;B</p><script>x()</script><div>C</div>'), /A&B\s*\n\s*C/)
  const parsed = await parseFile('markdown', new TextEncoder().encode('﻿# 标题\n正文'))
  assert.deepEqual(parsed, { kind: 'markdown', text: '# 标题\n正文' })
})

test('PDF pages and DOCX paragraphs are extracted', async () => {
  const pdf = await parseFile('pdf', makePdf(['Router reset procedure', 'Toner replacement']))
  assert.equal(pdf.kind, 'pages')
  assert.equal((pdf as { pages: readonly string[] }).pages.length, 2)
  assert.match((pdf as { pages: readonly string[] }).pages[1]!, /Toner replacement/)

  const docx = await parseFile('docx', await makeDocx(['第一段：安装说明', 'Second paragraph']))
  assert.equal(docx.kind, 'text')
  assert.match((docx as { text: string }).text, /第一段：安装说明\s+Second paragraph/)
})
