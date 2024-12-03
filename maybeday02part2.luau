local file = io.open("input", "r")
local input = file:read("*a")
file:close()

function isIncreasing(nums)
	for i = 2, #nums do
		if nums[i] > nums[i - 1] then return false end
	end
	return true
end

function isDecreasing(nums)
	for i = 2, #nums do
		if nums[i] < nums[i - 1] then return false end
	end
	return true
end

function isSafe(nums)
	for i = 2, #nums do
		local diff = math.abs(nums[i] - nums[i - 1])
		if diff < 1 or diff > 3 then return false end
	end
	return true
end

local safe = 0

for _, line in input:split("\n") do
	local nums = line:split(" ")
	for i, v in nums do
		nums[i] = tonumber(v)
	end
	if isSafe(nums) and (isIncreasing(nums) or isIncreasing(nums)) then
		safe += 1
    continue
	end
	for i in nums do
		local newNums = table.clone(nums)
		table.remove(newNums, i)
		if isSafe(newNums) and (isIncreasing(newNums) or isIncreasing(newNums)) then
			safe += 1
      break
		end
	end
end

print(safe)
