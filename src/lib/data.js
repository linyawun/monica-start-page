import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from "next/cache"

export async function fetchCategoriesAndLinks() {
	noStore()
	try {
		const categoriesData = await sql`
      SELECT
        c.id as category_id,
        c.title,
        c.color,
        c.align,
        l.id as link_id,
        l.name,
        l.url,
        l.icon
      FROM categories c
      LEFT JOIN links l ON c.id = l.category_id
      ORDER BY c.title ASC, l.name ASC
    `

		const categories = []
		let currentCategory = null

		categoriesData.rows.forEach((row) => {
			if (!currentCategory || currentCategory.title !== row.title) {
				if (currentCategory) {
					categories.push(currentCategory)
				}
				currentCategory = {
					id: row.category_id,
					title: row.title,
					color: row.color,
					align: row.align,
					links: []
				}
			}
			if (row.link_id) {
				// Only add link if it exists (due to LEFT JOIN)
				currentCategory.links.push({
					id: row.link_id,
					name: row.name,
					url: row.url,
					icon: row.icon
				})
			}
		})

		// Add last category if exists
		if (currentCategory) {
			categories.push(currentCategory)
		}

		return categories
	} catch (err) {
		console.error("Database Error:", err)
		throw new Error("Failed to fetch categories and links.")
	}
}

export async function recreateCategoriesAndLinks(list) {
	try {
		// 清空 Categories 和 Links 表
		await sql`TRUNCATE TABLE links RESTART IDENTITY CASCADE;`
		await sql`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`

		// 遍历 list 数组，重新插入每个类别及其链接
		for (const category of list) {
			const categoryId = await sql`
			INSERT INTO categories (title, color, align)
			VALUES (${category.title}, ${category.color}, ${category.align})
			RETURNING id;
      `.then((res) => res.rows[0].id)
			console.log("categoryId", categoryId)

			for (const link of category.links) {
				await sql`
			    INSERT INTO links (category_id, name, url, icon)
			    VALUES (${categoryId}, ${link.name}, ${link.url}, ${link.icon});
			  `
			}
		}
	} catch (error) {
		console.error("Database Error:", error)
		throw new Error("Failed to recreate categories and links.")
	}
}

export async function updateCategoriesAndLinks(list) {
	try {
		await sql`BEGIN`

		// 获取数据库中现有的 Categories 和 Links
		const existingCategoriesRes = await sql`SELECT * FROM categories`
		const existingLinksRes = await sql`SELECT * FROM links`

		const existingCategories = existingCategoriesRes.rows ? existingCategoriesRes.rows : []
		const existingLinks = existingLinksRes.rows ? existingLinksRes.rows : []

		// 处理每个 Category
		for (const category of list) {
			const existingCategory = existingCategories.find((c) => c.id === category.id)

			let categoryId
			if (existingCategory) {
				// 更新现有 Category
				await sql`
          UPDATE categories
          SET title = ${category.title}, color = ${category.color}, align = ${category.align}
          WHERE id = ${category.id};
        `
				categoryId = category.id
			} else {
				// 插入新的 Category
				categoryId = await sql`
          INSERT INTO categories (title, color, align)
          VALUES (${category.title}, ${category.color}, ${category.align})
          RETURNING id;
        `.then((res) => res.rows[0].id)
			}

			// 处理 Links
			for (const link of category.links) {
				const existingLink = existingLinks.find((l) => l.id === link.id)

				if (existingLink) {
					// 更新现有 Link
					await sql`
            UPDATE links
            SET category_id = ${categoryId}, name = ${link.name}, url = ${link.url}, icon = ${link.icon}
            WHERE id = ${link.id};
          `
				} else {
					// 插入新的 Link
					await sql`
            INSERT INTO links (category_id, name, url, icon)
            VALUES (${categoryId}, ${link.name}, ${link.url}, ${link.icon});
          `
				}
			}

			// 删除不再出现在新 list 中的 Links
			const linksToDelete = existingLinks.filter(
				(l) => l.category_id === categoryId && !category.links.some((nl) => nl.id === l.id)
			)
			for (const linkToDelete of linksToDelete) {
				await sql`DELETE FROM links WHERE id = ${linkToDelete.id}`
			}
		}

		// 删除不再出现在新 list 中的 Categories
		const categoriesToDelete = existingCategories.filter(
			(ec) => !list.some((nc) => nc.id === ec.id)
		)
		for (const categoryToDelete of categoriesToDelete) {
			await sql`DELETE FROM categories WHERE id = ${categoryToDelete.id}`
		}

		await sql`COMMIT`
		console.log("Categories and links updated.")
	} catch (error) {
		await sql`ROLLBACK`
		console.error("Database Error:", error)
		throw new Error("Failed to update categories and links.")
	}
}
