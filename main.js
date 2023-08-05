const { Plugin } = require('obsidian');

class TemplatePlugin extends Plugin {
  cursorPlaceholder = '⊹';
  nextCursorPosition = null;

  async onload() {
    // Define your templates here
    const templates = [
      {
        id: 'insert-template-1',
        name: 'Big Text',
        hotkey: '1',
        template: "<big>{{cursor}}</big>",
      },
      {
        id: 'insert-template-2',
        name: 'Code Block',
        hotkey: '2',
        template: `\`\`\`{{cursor}}
{{cursor}}
\`\`\`
{{cursor}}`,
      },
      {
        id: 'insert-template-3',
        name: 'Embed',
        hotkey: '3',
        template: "![ {{cursor}} ]({{cursor}}).{{cursor}}",
      },
      {
        id: 'insert-template-4',
        name: 'Link',
        hotkey: '4',
        template: "[{{cursor}}]({{cursor}}){{cursor}}",
      }
    ];

    templates.forEach(tpl => {
      this.addCommand({
        id: tpl.id,
        name: tpl.name,
        checkCallback: (checking) => {
          let leaf = this.app.workspace.activeLeaf;
          if (leaf) {
            if (!checking) {
              this.insertTemplate(leaf, tpl.template);
            }
            return true;
          }
          return false;
        },
        hotkeys: [
          {
            modifiers: ['Mod', 'Shift'],
            key: tpl.hotkey,
          },
        ],
      });
    });

    this.addCommand({
      id: 'cycle-cursor-position',
      name: 'Cycle Cursor Position',
      checkCallback: (checking) => {
        let leaf = this.app.workspace.activeLeaf;
        if (leaf) {
          if (!checking) {
            this.cycleCursor(leaf);
          }
          return true;
        }
        return false;
      },
      hotkeys: [
        {
          modifiers: ['Mod'],
          key: 'Enter',
        },
      ],
    });
  }

  async insertTemplate(leaf, template) {
    if (leaf.view.getViewType() === "markdown" && leaf.view.sourceMode) {
      let editor = leaf.view.sourceMode.cmEditor;
      let doc = editor.getDoc();
      let cursor = doc.getCursor();

      // Replace {{cursor}} tags with a placeholder
      template = template.replace(/{{cursor}}/g, this.cursorPlaceholder);

      // Insert the template at the cursor position
      doc.replaceRange(template, cursor);

      // Store the next cursor position
      this.nextCursorPosition = cursor;

      // Move the cursor to the first placeholder
      this.cycleCursor(leaf);

      // Refresh the editor to make sure everything is updated
      editor.refresh();
    }
  }

  async cycleCursor(leaf) {
    if (leaf.view.getViewType() === "markdown" && leaf.view.sourceMode) {
      let editor = leaf.view.sourceMode.cmEditor;
      let doc = editor.getDoc();

      // Start searching for the next placeholder from the current cursor position
      for (let line = this.nextCursorPosition.line; line < doc.lineCount(); line++) {
        let lineText = doc.getLine(line);
        let ch = line === this.nextCursorPosition.line ? this.nextCursorPosition.ch : 0;
        let placeholderIndex = lineText.indexOf(this.cursorPlaceholder, ch);
        if (placeholderIndex !== -1) {
          doc.setCursor(line, placeholderIndex);
          doc.replaceRange('', { line: line, ch: placeholderIndex }, { line: line, ch: placeholderIndex + this.cursorPlaceholder.length });
          this.nextCursorPosition = { line: line, ch: placeholderIndex + 1 }; // set the start of the next search to the character after the current one
          break;
        } else if (line !== this.nextCursorPosition.line) {
          // If no placeholders on this line and we've finished checking the original cursor line, reset ch for the next line
          this.nextCursorPosition.ch = 0;
        }
      }

      // Refresh the editor to make sure everything is updated
      editor.refresh();
    }
  }
}

module.exports = TemplatePlugin;