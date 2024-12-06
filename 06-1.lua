local function split(str, delim)
	local res = {}
	(str .. delim):gsub("(.-)"..delim, function(match)
		table.insert(res, match)
	end)
	return res
end

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

local fileData = io.open("input")
for x, line in next, split(fileData:read("*a"), "\n") do
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
fileData:close()

local positionsOccupied = {}

function find(t, value)
	for i, v in next, t do
		if v == value then return i end
	end
end

while true do
	local str = position.x .. "," .. position.y
	if not find(positionsOccupied, str) then
		table.insert(positionsOccupied, str)
	end
	local nextX = position.x + direction.x
	local nextY = position.y + direction.y
	if not grid[nextX] or not grid[nextX][nextY] then
		print("broke out at", nextX, nextY)
		break	
	end
	if grid[nextX][nextY] == "#" then
		dirIdx = dirIdx + 1
		if dirIdx > #directions then
			dirIdx = 1
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
