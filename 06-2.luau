-- still does not wokr

local grid = {}
local directions = {
	{x = -1, y = 0},
	{x = 0, y = 1},
	{x = 1, y = 0},
	{x = 0, y = -1}
}

local position = {x = 0, y = 0}
local dirIdx = 1
local direction = directions[1]

--local file = io.open("input")
local fileData = require(script.input) --file:read("*a")
--for x, line in next, split(fileData, "\n") do
for x, line in fileData:split("\n") do
	local column = {}
	for y = 1, #line do
		local char = line:sub(y, y)
		table.insert(column, char)
		if char == "^" then
			position = {x = x, y = y}
		end
	end
	grid[x] = column
end
--fileData:close()

local positionsOccupied = {}
local amtTurns = 0
local waa = 0

local newObstacleLocations = {}

while true do
	local str = `{position.x},{position.y}`
	if not table.find(positionsOccupied, str) then
		table.insert(positionsOccupied, str)
	end
	local nextX = position.x + direction.x
	local nextY = position.y + direction.y
	if not grid[nextX] or not grid[nextX][nextY] then
		break	
	end
	if grid[nextX][nextY] == "#" then
		amtTurns += 1
		dirIdx = dirIdx + 1
		if dirIdx > #directions then
			dirIdx = 1
		end
		local str2 = `{nextX},{nextY}`
		if table.find(newObstacleLocations, str2) then
			waa += 1
		else
			table.insert(newObstacleLocations, str2)
		end
		direction = directions[dirIdx]
		nextX = position.x + direction.x
		nextY = position.y + direction.y
	end
	grid[position.x][position.y] = "X"
	position.x = nextX
	position.y = nextY
end

--for _, line in next, grid do
--	print(table.concat(line, ""))
--end

print(#positionsOccupied)
print(waa)
