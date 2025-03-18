import { INodeType, INodeTypeDescription } from "n8n-workflow";

import * as reseller from './actions/reseller';

export class CloudAlly implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'CloudAlly',
		name: 'cloudAlly',
		icon: 'file:cloudally.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}: {{$parameter["resourceType"]}} {{$parameter["resource"]}}',
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
			baseURL: "https://api.cloudally.com/v2",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': "={{$credentials.accessToken}}",
				'client-id': "={{$credentials.clientId}}",
				'client-secret': "={{$credentials.clientSecret}}",
			},
		},
		properties: [
			{
				displayName: 'Resource Type',
				name: 'resourceType',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Reseller', value: 'reseller'},
				],
				default: 'reseller',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'data' },
							}
						],
					}
				}
			},
			...reseller.description,
		],
	};
	methods = {
		loadOptions: {
		},
	};
}
