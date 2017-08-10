export const ItemTypes = {
	tile: 'tile',		// drop tile onto editor
	node: 'node',		// move nodes around
	connect: 'connect',	// connect nodes
	scroll: 'scroll',	// editor scrolling - unimplemented
	select: 'select'	// drag selecting in editor - unimplemented
}

export const MenuTypes = {
	node: 'node'
}

export const NodeNames = [
	'data_upload',
	'data_cleansing',
	'data_processing',
	'data_join',
	'data_warehouse',
	'linear_regression',
	'neural_network',
	'prediction',
	'billing'
]

export const ProperNames = {
	data_upload: 'Data Upload',
	data_cleansing: 'Data Cleansing',
	data_processing: 'Data Processing',
	data_join: 'Data Join',
	data_warehouse: 'Data Warehouse',
	linear_regression: 'Linear Regression',
	neural_network: 'Neural Network',
	prediction: 'Prediction',
	billing: 'Billing'
}

export const SourceFiles = {
	tile: {
		data_upload: 'uploadblue.png',
		data_cleansing: 'cleansingblue.png',
		data_processing: 'processingblue.png',
		data_join: 'joinblue.png',
		data_warehouse: 'warehouseblue.png',
		linear_regression: 'regressionblue.png',
		neural_network: 'networkblue.png',
		prediction: 'predictionblue.png',
		billing: 'billingblue.png'
	}
}
