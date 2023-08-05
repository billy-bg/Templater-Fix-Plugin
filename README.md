# Templater Fix Plugin

A quick fix/workaround for the following Open Templater Issues:
- [Templater Cursor Function (tp.file.cursor) stops working after 2^16 (65,536) characters](https://github.com/SilentVoid13/Templater/issues/1143)
- [tp.file.cursor() puts the cursor at the beginning of the line if there are greater than 65,536 (2^16) characters](https://github.com/SilentVoid13/Templater/issues/674)

# Instructions:
1. **Create your templates:** Open "main.js" and replace the example templates with your own. *Note: You can add as many templates as you want by copying, pasting and editing the existing templates.* The `{{cursor}}` function behaves the same way as `<%tp.file.cursor()%>` in Templater. You can add as many `{{cursor}}` functions as you want in your templates.
2. Drag the "Templater-Fix-Plugin" folder into your ".obsidian>plugins" folder. *Note: command+shift+. to show hidden files on Mac*
3. Enable the plugin in Obsidian's settings.
4. **Configure template and cursor hotkeys:** Open Obsidian's settings and navigate to "Hotkeys". Search for "Templater Fix Plugin" and set your hotkeys. A convenient "Cycle Cursor Position" hotkey is "command+enter". When a template is loaded, the cursor is automatically placed at the first `{{cursor}}` position. Using the cursor hotkey will cause the cursor to cycle through each `{{cursor}}` position in the template chronologically. *Note: If you prefer to not use any hotkeys for your templates, you can still, by default, access your templates directly via the command palette.*

# Problems this plugin solves:
- The Templater Cursor Function (<%tp.file.cursor()%>) stops working when a template is inserted into a document longer than 2^16 (65,536) characters.
- General issues/bugs with the Templater Cursor Function (<%tp.file.cursor()%>). This includes cursor misplacement in specific situations or scrolling up of the document when a template with the cursor function is inserted.
- Having to press the cursory hotkey multiple times in Templater to move the cursor to the correct position.

# Future Updates:
If requested and if the original issue has not yet been resolved by Templater, i may be able to add the following features:
- Numbering/ordering of cursor positions in the template, so that the cursor hotkey can be used to jump in a non-chronological order (similar to existing Templater functionality).
- Ability to use Templates in Obsidian directly instead of manually having to edit "main.js".

Please let me know if you have any questions or suggestions. I hope this plugin helps you out!

