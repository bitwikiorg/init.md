import fs from "node:fs"
import path from "node:path"
import process from "node:process"

const root = process.cwd()
const templateDir = path.join(root, "templates")

const expectedTemplates = [
  "minimal_init_protocol.md",
  "server_init_protocol.md",
  "dry_run_init_protocol.md",
  "development_project_init_protocol.md",
  "agent_init_protocol.md",
]

const requiredFields = [
  "name",
  "target",
  "purpose",
  "mode",
  "creates",
  "configures",
  "validates",
  "optional_outputs",
]

let hasError = false

for (const fileName of expectedTemplates) {
  const filePath = path.join(templateDir, fileName)

  if (!fs.existsSync(filePath)) {
    console.error(`Missing template file: templates/${fileName}`)
    hasError = true
    continue
  }

  const content = fs.readFileSync(filePath, "utf8")
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)

  if (!frontmatter) {
    console.error(`Missing metadata frontmatter: templates/${fileName}`)
    hasError = true
    continue
  }

  for (const field of requiredFields) {
    const hasField = new RegExp(`(^|\\n)${field}:`, "m").test(frontmatter[1])

    if (!hasField) {
      console.error(`Missing metadata field "${field}": templates/${fileName}`)
      hasError = true
    }
  }
}

if (hasError) {
  process.exit(1)
}

console.log(`Validated ${expectedTemplates.length} canonical template files.`)