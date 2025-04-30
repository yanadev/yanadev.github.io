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
