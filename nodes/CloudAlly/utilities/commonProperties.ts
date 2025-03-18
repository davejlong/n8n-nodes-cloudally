import { IN8nRequestOperations } from "n8n-workflow";

// WARNING: Using this pagination with an action will cause all other querystring params to be ignored...
export const pagination: IN8nRequestOperations = {
	pagination: {
		type: 'generic',
		properties: {
			continue: "={{ $response.body.page < $response.body.totalPages }}",
			request: {
				qs: {
					page: "={{ $response.body.page + 1 }}",
					limit: 500,
				},
			},
		},
	}
}
