import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.syncWithFlask', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const fileName = document.fileName;
            const lineNumber = editor.selection.active.line;
            const fileContents = document.getText();

            try {
                const response = await axios.post('http://localhost:9701/sync', {
                    fileName,
                    lineNumber,
                    fileContents
                });
                vscode.window.showInformationMessage('Synced with Flask server');
            } catch (error) {
                vscode.window.showErrorMessage('Failed to sync with Flask server');
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
