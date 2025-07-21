import { INodeProperties } from "n8n-workflow";

import { statuses } from "./statuses";
import { tasks } from "./tasks";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['backup'],
			},
		},
		options: [
			{
				name: 'Get Backup Statuses',
				value: 'getStatuses',
				action: 'Get backup statuses',
				routing: {
					request: {
						url: '/backup-statuses',
					},
					send: {
						paginate: true,
					},
				},
			},
			{
				name: 'Get Backup Task',
				value: 'getTask',
				action: 'Get one backup task',
				routing: {
					request: {
						url: '/backup-tasks',
					}
				}
			},
			{
				name: 'Get Backup Tasks',
				value: 'getTasks',
				action: 'Get backup tasks',
				routing: {
					request: {
						url: '/backup-tasks',
					},
					send: {
						paginate: true,
					},
				}
			},
		],
		default: 'getTasks',
	},
	...statuses,
	...tasks,
];
