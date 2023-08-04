import * as vscode from 'vscode';

const completionItems: any[] = [];

const provider = vscode.languages.registerCompletionItemProvider('css', {
	provideCompletionItems(document, position, token, context) {
		// 获取光标之前的范围
		const range = new vscode.Range(
			new vscode.Position(position.line, 0),
			position
		);

		// 获取光标之前的文本
		const textBeforeCursor = document.getText(range);

		// 使用正则表达式匹配数字
		const numberPattern = /\d+/;
		const numbers = textBeforeCursor.match(numberPattern);

		if (numbers) {
			// 基于匹配到的数字生成代码补全项
			const number = numbers[0];

			// 创建一个代码补全项
			const wpx = new vscode.CompletionItem(`${number}wpx -> ${Number(number) * 2}rpx`, vscode.CompletionItemKind.Keyword);
			wpx.insertText = `${Number(number) * 2}rpx`;

			completionItems.push(wpx);
		}

		return completionItems;
	}
});

export function activate(context: vscode.ExtensionContext) {
	// 注册监听器的订阅，确保当插件不再使用时被清理
	context.subscriptions.push(provider);
}

// This method is called when your extension is deactivated
export function deactivate() { }
