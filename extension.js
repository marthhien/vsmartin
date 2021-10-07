// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
 function activate(context) {
	context.subscriptions.push(   
		vscode.commands.registerCommand(
			'extension.martin', () => {
				// Create and show a new webview
				const panel = vscode.window.createWebviewPanel(
				  'pagehtml', // Identifies the type of the webview. Used internally
				  'Page html', // Title of the panel displayed to the user
				  vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				  {} // Webview options. More on these later.
				);

				    // And set its HTML content
					panel.webview.html = getWebviewContent();			
					  
			  })
			);
  }

  function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Page html</title>
  </head>
  <body>
	  <a href"#">Voici le lien</a>
  </body>
  </html>`;
  }

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
