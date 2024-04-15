import { useSettings } from "@/context/settings"
import "ace-builds/src-noconflict/mode-json"
import "one-theme-ace/one-dark"
import { useEffect, useRef, useState } from "react"
import AceEditor from "react-ace"

const Editor = () => {
	const editor = useRef(null)
	const [hasError, setError] = useState(false)
	const { settings, setSettings } = useSettings()

	useEffect(() => {
		editor.current.editor.session.foldAll(
			1,
			editor.current.editor.session.doc.getAllLines().length
		)
	}, [])

	function onChange(changes) {
		try {
			JSON.parse(changes)
			setError(false)
		} catch (e) {
			setError(true)
		}
	}

	const handleSave = () => {
		const val = editor.current.editor.getValue()
		try {
			const newData = JSON.parse(val)
			// 检查每个 section 的 id 和每个 link 的 id 是否保持不变
			const idsAreUnchanged = newData.sections.list.every((newSection, sectionIndex) => {
				const originalSection = settings.sections.list[sectionIndex]
				if (!originalSection || newSection.id !== originalSection.id) {
					return false
				}

				// 检查 links 数组中的每个对象的 id
				return newSection.links.every((newLink, linkIndex) => {
					const originalLink = originalSection.links[linkIndex]
					return originalLink && newLink.id === originalLink.id
				})
			})

			if (!idsAreUnchanged) {
				setError(true)
				alert("You cannot change the id values of lists or links.")
				return
			}

			setSettings(newData)
			setError(false)
		} catch (e) {
			setError(true)
		}
	}

	return (
		<>
			<div className="relative w-full mt-2">
				<AceEditor
					defaultValue={JSON.stringify(settings, null, "\t")}
					mode="json"
					onChange={onChange}
					name="json-editor"
					theme="one_dark"
					showPrintMargin={false}
					style={{
						width: "100%"
					}}
					setOptions={{
						showLineNumbers: true,
						tabSize: 2,
						useWorker: false,
						highlightActiveLine: false,
						highlightSelectedWord: false,
						highlightGutterLine: false
					}}
					ref={editor}
				/>
			</div>
			<div className="absolute z-50 align-middle bottom-3 right-3">
				<div className="flex flex-row">
					{hasError ? (
						<p className="py-2 mr-1 text-red">Invalid JSON</p>
					) : (
						<button
							className="p-2 border text-blue border-blue hover:text-textColor"
							onClick={handleSave}>
							Save
						</button>
					)}
				</div>
			</div>
		</>
	)
}

export default Editor
