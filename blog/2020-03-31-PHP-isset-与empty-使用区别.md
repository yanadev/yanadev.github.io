---
slug: PHP-isset-empty
title: PHP isset()与empty()使用区别
authors: yana
tags: [PHP]
---

## isset

bool isset ( mixed $var [,mixed $...])：检测是否`声明`变量并且为`非NULL`

- var存在，且非NULL======>`TRUE`,否则`false`

- var存在，但为`NULL`==========>`FALSE`

```php
$a='123';
$b;
$d=NULL;
$e="";
var_dump(isset($a,$b,$c)) ;//===>fasle
var_dump(isset($a));//===========>true
var_dump(isset($b));//==========>false
var_dump(isset($c));//==========>false
var_dump(isset($a,$b));//=======>false
var_dump(isset($a,$d));//=======>false
var_dump(isset($a,$e));//========>true
```

## empty

1.bool empty ( mixed $var )：判断变量是否为`NULL`

2.`变量没有声明`或者`变量==false`======>**不存在**

3.**不存在**========>empty()就不会产生警告`TRUE`

4.变量**存在**且值**非空非零**==============>`TRUE`

```php
var_dump(empty($a));//===========>false
var_dump(empty($b));//==========>true
var_dump(empty($c));//==========>true
var_dump(empty(NULL));//==========>true
var_dump(empty(""));//==========>true
var_dump(empty("0.0"));//=======>false
var_dump(empty("0"));//==========>true
var_dump(empty(FALSE));//==========>true
var_dump(empty(array()));//==========>true
```

```bash
# 以下的东西被认为是空的：

# "" (空字符串)
# 0 (作为整数的0)
# 0.0 (作为浮点数的0)
# "0" (作为字符串的0)
# NULL
# FALSE
# array() (一个空数组)
# $var; (一个声明了，但是没有值的变量)
```

## 总结

- PHP的isset()函数 一般用来检测变量是否设置  

- PHP的empty()函数 判断值为否为空
