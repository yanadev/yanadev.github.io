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

### 229. 多数元素 Ⅱ

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
