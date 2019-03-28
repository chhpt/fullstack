# MongoDB Tips

1. 删除文档的某个条目

```shell
db.example.update({}, { $unset: { words:1 }} , { multi: true });
```

2. 设置新的属性

```shell
db.articles.update({}, { $set:{ views: NumberInt(0) }},{ multi:true })
```