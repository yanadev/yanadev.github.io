---
slug: algorithm-introduction
title: 算法导论
authors: yana
tags: [algorithm]
draft: true
---

# Frequency Count Method

- `for(i = 0; i < n; i++) ----------- O(n)`
- `for(i = 0; i < n; i--) ----------- O(n)`
- `for(i = 0; i < n; i = i + 2) ------------ n/2 * O(n)`

> 无论是++，还是--，无论数值多大，都是 O(n)

- `for(i = 0; i < n; i = i * 2) ------------ O(log2(n))`
- `for(i = 0; i < n; i = i * 3) ------------ O(log3(n))`
- `for(i = 0; i < n; i = i / 2) ------------ O(log2(n))`

> 无论是乘法，还是除法，无论数值多大，都是 O(logn)

无明确的执行次数时，假设跳出循环执行了 k 次，求变量的第 k 个值的公式，根据循环结束条件，求 k （即执行次数）

运算的时候只关注最大阶变量

没有明显规律的累加，直接将前面的变量同步写出来，再看规律

两端进行对数运算之后，不能随便去掉系数

# 哈希表

## 1. 两数之和

```js
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标


示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]


function twoSum (nums, target) {
  let map = new Map()

  for(let i = 0; i < nums.length; i++) {
    let complement = target - nums[i] // 获取当前元素差值

    if(map.has(complement)) { // 判断哈希表中有无当前差值（键）对应的值
      return [map.get(complement), i] // 返回下表
    }

    map.set(nums[i], i) // 无论有无都存入哈希表
  }

  return [] // 循环结束都没有的话，确保函数无论如何都有返回值
}
```

思路：

1. 首先理解题目，题目给出 nums 数组和两数之和 target
2. 正常情况会想着暴力从头遍历，定位一个，后面部分遍历找到相加等于 target 的值（暴力解法）
3. 这样两个数据是有关联的，优先考虑哈希表(2 次哈希)

   - 全部遍历一次记录到哈希表中，因为返回值要求是数组下标，所以 key 存储值， value 存储数组下标
   - 二次遍历数组，定位 nums[i], 通过 target - nums[i] 找到差值，判断哈希表中有没有这个值，同时不能下标为当前 i
   - 如果有，直接返回 [i, map.get(target - nums[i])]

4. 或者单次哈希【建议写法】
   - 循环外部定义哈希表
   - 循环内，首先获取差值 complement = target - nums[i]
   - 判断哈希表中是否有这个值，如果有的话，直接返回 [i, map.get(complement)]
   - 如果没有哈希表记录当前的值和对应的数组下标（这样相当于以当前遍历位置把数组分割成两半，已经遍历区域为哈希查询范围，
     当前为选中的其中一个值，免去了两次遍历）
   - 循环外部考虑完全找不到的情况，返回[]，确保函数一直有返回结果

## 169. 多数元素

```js
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。



示例 1：

输入：nums = [3,2,3]
输出：3
示例 2：

输入：nums = [2,2,1,1,1,2,2]
输出：2


提示：
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109


进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // 返回出现次数大于数组长度一半的元素值
    // 使用哈希表记录 key - 元素，val - 次数
    // 因为题目中设定一定能找到这个元素，所以不需要等全部遍历完比再去找
    // 如果设定中不一定可以找到目标元素，需要遍历完毕再去找符合的元素
    // 因为题目要求是返回 出现 n/2 次的元素，这个元素只有 1 || 0 两种结果
    let mid = Math.floor(nums.length / 2)
    let map = new Map()

    for(let i = 0; i < nums.length; i++){
        let current = nums[i]
        map.set(current, (map.get(current) || 0) + 1)
        if(map.get(current) > mid) return current
    }

};
```

思路：

1. 返回出现次数大于数组长度一半的元素值
2. 使用哈希表记录 key - 元素，val - 次数
3. 因为题目中设定一定能找到这个元素，所以不需要等全部遍历完比再去找
4. 如果设定中不一定可以找到目标元素，需要遍历完毕再去找符合的元素
5. 因为题目要求是返回 出现 n/2 次的元素，这个元素只有 1 || 0 两种结果

## 229. 多数元素 Ⅱ

```js
给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。



示例 1：

输入：nums = [3,2,3]
输出：[3]
示例 2：

输入：nums = [1]
输出：[1]
示例 3：

输入：nums = [1,2]
输出：[1,2]


提示：

1 <= nums.length <= 5 * 104
-109 <= nums[i] <= 109


进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。


/**
 * 遍历完毕之后，再去遍历生成的哈希表
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    let cubic = Math.floor(nums.length / 3)
    let map = new Map()
    let target = []

    for(let i = 0; i < nums.length; i++){
        map.set(nums[i], ((map.get(nums[i]) || 0) + 1))
    }

    for(let [num, count] of map.entries()){
        if(count > cubic){
            target.push(num)
        }
        if(target.length>=2){
            return target
        }
    }
    return target
};

/**
 * 一边遍历生成哈希表，一边查找符合的元素，同时使用 Set 集合确保不会出现重复的数据
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function(nums) {
    const cubic = Math.floor(nums.length / 3);
    const map = new Map();
    const target = new Set();

    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        const count = (map.get(current) || 0) + 1;
        map.set(current, count);

        if (count > cubic) {
            target.add(current);
        }
    }

    return [...target];
};
```

## 349. 两个数组的交集

```js
给定两个数组 nums1 和 nums2 ，返回 它们的 交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。



示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
解释：[4,9] 也是可通过的


提示：

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
```

思路:

**两个集合并入一个新的集合**

1. 遍历 nums1 和 nums2，分别放进两个 set（或哈希表的 key）。
2. 遍历其中一个 set，看元素是否存在于另一个 set 中。
3. 如果存在，就加入结果的 set。
4. 最后把结果 set 转成数组返回。

```js
/**
 * 初始 3 个 Set，2个遍历数组，1个收集遍历后 Set 重叠处合集
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  let set1 = new Set()
  let set2 = new Set()
  for (let i = 0; i < nums1.length; i++) {
    set1.add(nums1[i])
  }
  for (let i = 0; i < nums2.length; i++) {
    set2.add(nums2[i])
  }
  let ret = new Set()
  for (let i of set1) {
    if (set2.has(i)) {
      ret.add(i)
    }
  }
  return [...ret]
}

// 或者

/**
 * 初始 3 个 Set，2个遍历数组，1个收集遍历后 Set 重叠处合集
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)
  let res = new Set()
  for (let i of set1) {
    if (set2.has(i)) {
      res.add(i)
    }
  }
  return [...res]
}

/**
 * 一个 Set存储 nums1，另一个 Set 处理重叠元素
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1)
  let res = new Set()
  for (let i = 0; i < nums2.length; i++) {
    if (set1.has(nums2[i])) {
      res.add(nums2[i])
    }
  }
  return [...res]
}
```

## 350. 两个数组的交集 Ⅱ

```js
给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。



示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
示例 2:

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]


提示：

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000


进阶：

如果给定的数组已经排好序呢？你将如何优化你的算法？
如果 nums1 的大小比 nums2 小，哪种方法更优？
如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
```

### 思路 1（单个哈希表）

1. 数组一先遍历得出`元素-个数` 哈希表
2. 然后通过遍历第二个数组
3. 若元素在数组一中存在，更新数组一的个数，将目标元素推入结果数组

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let map1 = new Map()
  for (let i = 0; i < nums1.length; i++) {
    map1.set(nums1[i], (map1.get(nums1[i]) || 0) + 1)
  }

  let res = []
  for (let i = 0; i < nums2.length; i++) {
    let old = map1.get(nums2[i])
    if (map1.has(nums2[i]) && old > 0) {
      res.push(nums2[i])
      map1.set(nums2[i], old - 1)
    }
  }
  return res
}
```

### 思路 2（3 个哈希表）

1. 两个数组分别遍历得出`元素-个数` 哈希表
2. 遍历其中一个哈希表，判断另一个哈希表中有无该元素，若有，更新到 ret 哈希表中，取数量小的数量值
3. 遍历 ret 哈希表，将目标值逐个遍历导入最终结果 res 数组

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  let map1 = new Map()
  for (let i = 0; i < nums1.length; i++) {
    map1.set(nums1[i], (map1.get(nums1[i]) || 0) + 1)
  }

  let map2 = new Map()
  for (let i = 0; i < nums2.length; i++) {
    map2.set(nums2[i], (map2.get(nums2[i]) || 0) + 1)
  }

  let ret = new Map()
  for (let [val, count] of map1.entries()) {
    if (map2.has(val)) {
      const count2 = map2.get(val)
      const retCount = count2 < count ? count2 : count
      ret.set(val, retCount)
    }
  }
  let res = []
  for (let [val, count] of ret) {
    for (let i = 0; i < count; i++) {
      res.push(val)
    }
  }
  return res
}
```

##

### 思路（单哈希表 - 题目中强调了数组内部元素各不相同，如果相同的情况需要先逐个处理数组）

1. 创建哈希表，遍历二维数组中的第一位 nums[0]，默认长度为一维数组的长度 `len(nums.length)`
2. 依次遍历二维数组中的元素 `nums[0] - nums[len]`，判断元素是否在哈希表中存在，如果存在，哈希表中该元素的数量 - 1
3. 依次遍历哈希表，寻找元素数量为 0 的元素，将元素推入到结果数组
4. 最后给结果数组排序（升序）

```js
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var intersection = function (nums) {
  let len = nums.length
  let map = new Map()

  for (let i = 0; i < nums[0].length; i++) {
    map.set(nums[0][i], len)
  }
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < nums[i].length; j++) {
      if (map.has(nums[i][j])) {
        let old = map.get(nums[i][j])
        map.set(nums[i][j], old - 1)
      }
    }
  }
  let res = []
  for (let [val, count] of map.entries()) {
    if (count == 0) {
      res.push(val)
    }
  }

  return res.sort((a, b) => a - b) // 符合 a-b>0 条件的元素交换位置，所以元素按照从小到大排序
}
```

## 560. 和为 K 的子数组

```js
给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。

子数组是数组中元素的连续非空序列。



示例 1：

输入：nums = [1,1,1], k = 2
输出：2
示例 2：

输入：nums = [1,2,3], k = 3
输出：2


提示：

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
```

### 思路【前缀和 i~j 其实要求的是 j 减去 i-1 得到区间值】

1. 重点理解 `为什么使用前缀和`,把求 `和为 k 的子数组`，换成 `求两个前缀和的差值为 k 的前缀区间`
2. 转换完毕之后需要注意
   `初始化空数组或首元素前缀和为 0 的情况，mp.set(0, 1) => 前缀和为 0 的有一种（第一个元素或者空数组）`
3. 遍历整个数组，

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let mp = new Map()
  mp.set(0, 1) // 初始化空数组或者首位元素的前缀和为 0 的可能性
  let prev = 0
  let sum = 0
  nums.forEach((e, i) => {
    prev += e // 获取当前位置的前缀和
    // 由 当前前缀和 - 之前前缀和 = k 求之前前缀和 = 当前前缀和 - k，判断前缀和哈希表中是否有符合的之前位置的前缀和
    if (mp.has(prev - k)) {
      sum += mp.get(prev - k)
      // 如果有，累计这个次数到结果集
    }
    mp.set(prev, (mp.get(prev) || 0) + 1) // 判断是否累加完毕后将当前前缀和记录到哈希表，以供后续元素使用
  })

  return sum
}
```
