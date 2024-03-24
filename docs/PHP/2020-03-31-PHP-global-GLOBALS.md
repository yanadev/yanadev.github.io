---
slug: PHP-global
title: PHP 全局变量 global 与超全局变量 $_GLOBALS
tags: [PHP]
authors: yana
---

## 访问全局变量

如需要访问全局变量，可以通过`global`关键字声明

```php
<?php $top = 'top variable';
function foo () {   
    // 声明在当前作用域中获取全局作用域中的 `$top`   
    global $top;     
    $sub = 'sub variable';     
    echo $top;   // => `top variable`     
    function bar () {     
    // 声明在当前作用域中获取全局作用域中的 `$top` 和 `$bar`
        global $top, $bar;       
        echo $top;     // => `top variable`       
        echo $sub;     
        // => 任然无法拿到，因为 `$sub` 不再全局范围，而是在 `foo` 函数中定义 
    }     
    bar(); 
}   
foo();
```

## 超全局变量

- $_GLOBALS——引用全局作用域中可用的全部变量

- $_SERVER——或服务端相关信息

- $_REQUEST——获取提交参数

- $_POST——获取POST提交参数

- $_GET——获取GET提交参数

- $_FILES——获取上传文件

- $_ENV——操作环境变量

- $_COOKIES——操作Cookies

- $_SESSION——操作Session

## $GLOBALS

在PHP脚本中任意位置访问全局变量（函数或方法中均可）

```php
$x=14;
$y=40;
function foo(){
 $GLOBALS['z']=$GLOBALS['x']+$GLOBALS['y'];
}
foo();
echo $z;
//=>54
```
