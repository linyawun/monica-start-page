const categories = [
	{
		id: "6651abab-b4cd-4cd0-abde-efdab08e3cce",
		title: "General",
		color: "green",
		align: "left"
	},
	{
		id: "5385f7ac-08a9-4e71-a14d-06f39482aa4c",
		title: "Dev",
		color: "magenta",
		align: "left"
	},
	{
		id: "a689cd78-2098-487b-9111-86a488d8131d",
		title: "Social",
		color: "cyan",
		align: "left"
	},
	{
		id: "924f8d21-77ff-4b99-b46b-87c52ee035e5",
		title: "Gaming",
		color: "red",
		align: "left"
	},
	{
		id: "346f1d34-8c55-49f3-afa2-405bec8ddf0f",
		title: "Science",
		color: "blue",
		align: "left"
	},
	{
		id: "fe9eed30-4681-4d72-9220-a1139c42a432",
		title: "Tech",
		color: "yellow",
		align: "left"
	}
]

const links = [
	{
		id: "a750fc9d-9b32-4f25-a8aa-fe99e256e3e8",
		category_id: categories[0].id,
		name: "Portfolio",
		url: "https://cancellek.com",
		icon: "mdi:web"
	},
	{
		id: "d944e5fd-19f1-48b3-8ff0-9638a0b84b88",
		category_id: categories[0].id,
		name: "Keybase",
		url: "https://keybase.io/",
		icon: "fa-brands:keybase"
	},
	{
		id: "9b636785-cb45-4933-b66b-6a2cbb222009",
		category_id: categories[0].id,
		name: "GPT",
		url: "https://chat.openai.com/",
		icon: "simple-icons:openai"
	},
	{
		id: "5a0d7e9b-a8c4-42cb-9ee0-603e2c16c0e9",
		category_id: categories[0].id,
		name: "OCI",
		url: "https://www.oracle.com/cloud/",
		icon: "simple-icons:oracle"
	},
	{
		id: "8ca34742-3c75-4309-b5f9-7bf58665616a",
		category_id: categories[1].id,
		name: "GitHub",
		url: "https://github.com",
		icon: "mdi:github"
	},
	{
		id: "deaed2e3-ed14-4a6c-af41-9390180c5b3c",
		category_id: categories[1].id,
		name: "GitLab",
		url: "https://gitlab.com",
		icon: "ph:gitlab-logo-simple-fill"
	},
	{
		id: "15d4d934-8b8f-4b6f-9448-143a2baa8790",
		category_id: categories[1].id,
		name: "Dev.to",
		url: "https://dev.to",
		icon: "material-symbols:logo-dev"
	},
	{
		id: "442386ef-895b-4847-8781-6bdeeca59a6b",
		category_id: categories[2].id,
		name: "Twitter",
		url: "https://twitter.com",
		icon: "mdi:twitter"
	},
	{
		id: "6839511f-c429-411e-a8ba-9300ff8ae5a8",
		category_id: categories[2].id,
		name: "Mastodon",
		url: "https://mastodon.social/",
		icon: "ri:mastodon-fill"
	},
	{
		id: "7b52ab59-5943-4192-a51e-3b31f9bd3b05",
		category_id: categories[2].id,
		name: "Reddit",
		url: "https://reddit.com",
		icon: "mdi:reddit"
	},
	{
		id: "f2f965cf-94eb-4c7a-b504-c488b345a210",
		category_id: categories[2].id,
		name: "Polywork",
		url: "https://polywork.com",
		icon: "simple-icons:polywork"
	},
	{
		id: "3f6cfcf2-64b9-42e2-8e68-a72d2de8948b",
		category_id: categories[3].id,
		name: "Polygon",
		url: "https://polygon.com",
		icon: "uil:polygon"
	},
	{
		id: "e4c2201a-023b-4c5e-9e71-21a232b449b1",
		category_id: categories[3].id,
		name: "IGN",
		url: "https://ign.com",
		icon: "mdi:currency-sign"
	},
	{
		id: "d83a1784-491d-4e3a-aea1-662483078b2c",
		category_id: categories[3].id,
		name: "RPS",
		url: "https://rockpapershotgun.com/",
		icon: "ph:toilet-paper-bold"
	},
	{
		id: "80b39b29-68a2-45d2-9f7a-fc2a238e0a5a",
		category_id: categories[3].id,
		name: "80lv",
		url: "https://80.lv/",
		icon: "tabler:hand-rock"
	},
	{
		id: "f99f5a13-f91d-4349-b6f8-6f44852ecb40",
		category_id: categories[4].id,
		name: "PopSci",
		url: "https://popsci.com/",
		icon: "material-symbols:science"
	},
	{
		id: "71f264cf-acfc-42b4-a019-cbefb22a6a35",
		category_id: categories[4].id,
		name: "Space",
		url: "fa6-solid:user-astronaut",
		icon: "mdi:reddit"
	},
	{
		id: "7b25163b-50bf-45f6-a33f-8c5d49cdbdfd",
		category_id: categories[4].id,
		name: "NASA",
		url: "https://blogs.nasa.gov/",
		icon: "simple-icons:nasa"
	},
	{
		id: "ca7d0486-e7d0-4d10-80c2-dbc75bd51ff2",
		category_id: categories[4].id,
		name: "ESA",
		url: "https://blogs.esa.int/",
		icon: "mdi:black-mesa"
	},
	{
		id: "e8c71d66-a821-4e13-bb3f-943e60b8be5a",
		category_id: categories[5].id,
		name: "TechCrunch",
		url: "https://techcrunch.com/",
		icon: "game-icons:techno-heart"
	},
	{
		id: "76fd7611-cedc-4efc-9e5f-49546c26890b",
		category_id: categories[5].id,
		name: "Verge",
		url: "https://www.theverge.com/",
		icon: "arcticons:verge"
	},
	{
		id: "9bd1b3cd-7116-40aa-a346-4ba4e823ddc3",
		category_id: categories[5].id,
		name: "It's Foss",
		url: "https://itsfoss.com/",
		icon: "ri:mastodon-fill"
	},
	{
		id: "ca24e7f3-25c8-4d54-9a59-82ff785e737a",
		category_id: categories[5].id,
		name: "9To5 Linux",
		url: "https://9to5linux.com/",
		icon: "uil:linux"
	}
]

module.exports = {
	categories,
	links
}
