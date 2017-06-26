Editor:
	props:
		`<irrelevant>`
	state:
		nextNodeId
		nodes:
			id
			left
			top
			type
		nextConnectionId
		connections:
			id
			sNodeId
			sPortId
			eNodeId
			ePortId
			sX
			sY
			eX
			eY

Node:
	props:
		id
		left
		top
		in
		out
		addConnection() from editor
	state:
		connections: 
			portId: connectionId

Port:
	props:
		nodeId
		portId
		addConnection(id, sNodeID, sPortID, eNodeID, ePortID, sX, sY, eX, eY) from editor
		registerConnection(portID, connectionID) from node
	state:
		left
		top

Connection:
	props:
		sX
		sY
		eX
		eY
	state:
		`<none>`

Adding a Node:
tile drag
editor drop
node added to state, nextNodeId incremented
`in` InPorts are created, `out` OutPorts are created using fixed IDs

Adding a Connection:
port drag	> we have outX, outY, outPortID, outNodeID
port drop	> we have inX, inY, inPortID, inNodeID
grabs next connectionID, increments	> we have connectionID
Editor.addConnection(all of this info)
InNode.registerConnection(inPortID, connectionID)
OutNode.registerConnection(outPortID, connectionID)
