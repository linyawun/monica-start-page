import defaultConfig from "data/settings_tech.json"
import { createContext, useContext, useEffect, useState } from "react"

const SETTINGS_KEY = "settings"
const IS_DOCKER = process.env.BUILD_MODE === "docker"
const IS_LOCAL = process.env.BUILD_MODE === "local"

export const SettingsContext = createContext({
	settings: undefined,
	setSettings: (settings) => {}
})

export const useSettings = () => useContext(SettingsContext)

function debounce(func, wait) {
	let timeout

	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout)
			func(...args)
		}

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

const saveSettingsDebounced = debounce(function (settings, setItems) {
	if (IS_DOCKER || IS_LOCAL) {
		fetch("/api/saveSettings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(settings)
		}).then((res) => console.log("res", res))
		const { sections, ...otherSettings } = settings
		// 存除 sections 之外的 settings
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(otherSettings))
	} else {
		localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
	}

	let filterArr = [
		"help",
		"fetch",
		"config",
		"config help",
		"config edit",
		"config import",
		"config theme",
		"config reset"
	]

	fetch("/api/getTheme")
		.then((response) => response.json())
		.then((data) => {
			if (!data.message) {
				data.forEach((theme) => {
					filterArr.push("config theme " + theme)
				})
			}
		})
		.catch((error) => console.log(`Error fetching themes: ${error.message}`))

	settings.sections.list.map((section) => {
		section.links.map((link) => {
			{
				filterArr.push(link.name.toLowerCase())
			}
		})
	})
	setItems(filterArr)
}, 500)

export const SettingsProvider = ({ children }) => {
	const [settings, setSettings] = useState()
	const [items, setItems] = useState([])

	// Load settings
	useEffect(() => {
		let data
		let otherSettings

		if (IS_DOCKER || IS_LOCAL) {
			fetch("/api/loadSettings")
				.then((response) => response.json())
				.then((resData) => {
					const { sections, ...otherResData } = resData
					otherSettings =
						localStorage.getItem(SETTINGS_KEY) || JSON.stringify(otherResData)
					setSettings({ ...JSON.parse(otherSettings), sections })
				})
				.catch(() => setSettings(defaultConfig))
		} else {
			data = localStorage.getItem(SETTINGS_KEY)
			if (data === "undefined") {
				console.log("LocalStorage configuration reset to defaults.")
			}
			setSettings(data ? JSON.parse(data) : defaultConfig)
		}
	}, [])

	// Save settings
	useEffect(() => {
		if (settings && settings !== "undefined") {
			saveSettingsDebounced(settings, setItems)
		}
	}, [settings])

	// Update settings
	const updateSettings = async (newSettings) => {
		await setSettings(newSettings)
	}

	// Reset settings
	const resetSettings = () => {
		setSettings(defaultConfig)
	}

	return (
		<SettingsContext.Provider
			value={{ settings, setSettings: updateSettings, resetSettings, items }}>
			{children}
		</SettingsContext.Provider>
	)
}
