# DataTableSearchBox 使用教学

#### 功能：依设置动态的产生DataTable过滤器
#### 依赖：jQuery,Bootstrap,BootstrapDatetimepicker v4,DataTable

#### 用法：
##### 步骤1：先声明DataTable组件
    var table = $('#admin_table').DataTable({
                    "processing": true,
                    "serverSide": true,
                    "ajax": {
                        "url": "",
                        "type": "POST"
                    },
                    "language": {
                        url: 'js/bootstrap/js/chinese.json'
                    },
                    "columns": [
                        {"data": "id"},
                        {"data": "field1"},
                        {"data": "field2"},
                        {"data": "field2"}
                    ]
                });
    
##### 步骤2：声明DataTableSearchBox组件

    `        $("#search_box").dataTableSearchBox({
                table: table,
                label: {
                    0: "id",
                    1: "field1",
                    2: "field2",
                    3: "field3"
                },
                type: {
                    0: "num",
                    1: "text",
                    2: "datetime",
                    3: "status"
                },
                status_item: {
                    3: {
                        0: "否",
                        1: "是"
                    }
                }
            });`


#### 设置说明：
所有的属性皆使用**KV对**来进行设置。
**table**：DataTable组件
**label**：指得是每个过滤控件的标题
**type**：指得是每个过滤器控件的类型
**status_item**：是针对type类型为status的控件指定选项用的，可以自行决定该状态有多少选项

##### 属性中编号的意义：
1. DataTable内置过滤器编号绑定，由此就可以相容於DataTable的过滤请求配置
例：
`    table.columns(编号).search(值, true);`

2.透过属性中的编号让label、type、status_item结合在一起为一个完整的控件。

#### 假如有任何的問題！

欢迎使用[issues][1]来给予反馈。

#### 感謝大家的使用。
[1]: http://192.168.18.19/larrynis/DataTableSearchBox/issues