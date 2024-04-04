import fs from "fs"
import path from "path"
import { updateCategoriesAndLinks } from "@/lib/data"

// export default function handler(req, res) {
// 	const filePath = path.join(process.cwd(), "data", "settings.json")
// 	fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2))
// 	res.status(200).json({ message: "Settings saved" })
// }

export default async function handler(req, res) {
	try {
		const settings = req.body
		const list = settings.sections.list
		await updateCategoriesAndLinks(list)

		//const filePath = path.join(process.cwd(), "data", "settings.json")
		//fs.writeFileSync(filePath, JSON.stringify(settings, null, 2))

		res.status(200).json({ message: "Settings saved and categories updated" })
	} catch (error) {
		console.error("Error:", error)
		res.status(500).send("An error occurred")
	}
}
