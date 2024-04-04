import fs from "fs"
import path from "path"
import { fetchCategoriesAndLinks } from "@/lib/data"

// export default function handler(req, res) {
// 	const filePath = path.join(process.cwd(), "data", "settings.json")
// 	const fileContents = fs.readFileSync(filePath, "utf8")
// 	res.status(200).json(JSON.parse(fileContents))
// }

export default async function handler(req, res) {
	try {
		const list = await fetchCategoriesAndLinks()

		const filePath = path.join(process.cwd(), "data", "settings.json")
		const fileContents = fs.readFileSync(filePath, "utf8")
		const settings = JSON.parse(fileContents)

		// 替換 settings 中的 sections.list
		settings.sections.list = list

		res.status(200).json(settings)
	} catch (error) {
		console.error("Error:", error)
		res.status(500).send("An error occurred")
	}
}
