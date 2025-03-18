import { INodeProperties } from 'n8n-workflow';
import * as account from './account';
import * as bill from './bill';

export const description: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
			},
		},
		options: [
			{ name: 'Account', value: 'account' },
			{ name: 'Bill', value: 'bill'},
		],
		default: 'account',
	},
	...account.description,
	...bill.description,
]
