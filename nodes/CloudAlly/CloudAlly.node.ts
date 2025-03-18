import { INodeType, INodeTypeDescription } from "n8n-workflow";

import * as account from './actions/account';

export class CloudAlly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CloudAlly',
		name: 'cloudAlly',
		icon: 'file:cloudally.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Work with the CloudAlly API',
		defaults: {
			name: 'CloudAlly',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cloudAllyApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: "=https://api.cloudally.com/v2",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': '={{$credentials.accessToken}}',
				'client-id': '={{$credentials.clientId}}',
				'client-secret': '={{$credentials.clientSecret}}',
			}
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' }
				],
				default: 'account',
			},
			...account.description,
		],
	};
	methods = {
		loadOptions: {
		},
		// credentialTest: {
		// 	async cloudAllyApiCredentialTest(
		// 		this: ICredentialTestFunctions,
		// 		credential: ICredentialsDecrypted,
		// 	): Promise<INodeCredentialTestResult> {
		// 		const { accessToken, clientId, clientSecret } = credential.data as {
		// 			accessToken: string,
		// 			clientId: string,
		// 			clientSecret: string,
		// 		};
		// 		console.log("[CLOUDALLY] Testing credentials");
		// 		try {
		// 			await this.helpers.request({
		// 				url: "https://api.cloudally.com/v2/resellers/details",
		// 				method: 'GET',
		// 				headers: {
		// 					'Content-Type': 'application/json',
		// 					'Authorization': accessToken,
		// 					'client-id': clientId,
		// 					'client-secret': clientSecret,
		// 				},
		// 			});
		// 		} catch(error) {
		// 			console.log("[CLOUDALLY] Failed...")
		// 			if (error.statusCode === 401) {
		// 				return {
		// 					status: 'Error',
		// 					message: 'The credentials included in the request are invalid',
		// 				};
		// 			}
		// 		};

		// 		return {
		// 			status: 'OK',
		// 			message: 'Connection successful!'
		// 		}
		// 	},
		// },
	};
}
