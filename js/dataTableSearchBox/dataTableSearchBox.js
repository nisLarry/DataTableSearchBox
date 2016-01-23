/**
 * 项目名称：dataTableSearchBox
 * 依赖:jQuery,bootstrap,dataTable
 * 功能：动态产生过滤器控制项，并可直接相容於DataTable的过滤器机制(server型)
 * Created by larry on 2016/1/19.
 */
(function ($) {
    var methods = {
        /**
         *初始化方法，传进来的配置档一定要包含table(DataTable元件)、label(控制项过滤字段)、
         * type(使用的过滤器类型)、status_item(当使用status类型时要提供的选项)属性
         * @param options
         * @returns this
         */
        init: function (options) {
            methods.settings = $.extend({}, options);
            if (options.table == undefined || options.table == null) {
                $.error("jQuery.dataTableSearchBox options.table not defind;");
            }
            if (options.label == undefined || options.type == undefined || options.status_item == undefined) {
                $.error("jQuery.dataTableSearchBox options.label or otpions.type not defind;");
            }
            if (Object.getOwnPropertyNames(options.label).length != Object.getOwnPropertyNames(options.type).length) {
                $.error("jQuery.dataTableSearchBox options.label and otpions.type length not same;");
            }
            var label = options.label;
            var type = options.type;
            var status_item = options.status_item;
            var random = Math.floor((Math.random() * 1000) + 1);
            var search_select__name = "search_select_" + random;
            var search_btn_name = "search_btn_" + random;

            var searchbox = "<div class='input-group-btn'>" +
                "<button id='" + search_btn_name + "' type='button' class='btn btn-default'>" +
                "搜索" +
                "</button>" +
                "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>" +
                "<span class='caret'>" +
                "</span>" +
                "<span class='sr-only'>Toggle Dropdown</span>" +
                "</button>" +
                "<ul id='" + search_select__name + "' class='dropdown-menu'>" +
                "</ul>" +
                "</div>" +
                "<input type='text' class='form-control' aria-label='Text input with segmented button dropdown'>";
            this.append(searchbox);
            var $search_select = $("#" + search_select__name);

            $search_select.on("click", function (e) {
                e.stopPropagation();
            });

            $("#" + search_btn_name).on("click", function () {
                methods.draw_table();
            });

            methods.event_element = [];
            methods.filter = [];

            for (no in label) {
                methods['build_' + type[no] + '_box'].call($search_select, no, label[no], status_item[no]);
            }

            return this;
        },
        /**
         * 建构数字型过滤器
         * @param no 字段於DataTable的编号
         * @param label 字段名称
         * @returns this
         */
        build_num_box: function (no, label) {
            var random = Math.floor((Math.random() * 1000) + 1);
            var num_box_select = "num_box_select_" + random + "_nb";
            var input_name = "num_box_input_" + random + "_nb";
            var dropdown_btn_box = "<div class='btn-group dropdown-submenu'>" +
                "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>= " +
                "</button> " +
                "<ul id='" + num_box_select + "' class='dropdown-menu'> " +
                "<li class='text-center'>=</li> " +
                "<li class='text-center'>></li> " +
                "<li class='text-center'><</li> " +
                "</ul> </div>";
            var num_box =
                "<div class='row'>" +
                "<div class='col-sm-5'>" +
                "<div class='form-group'>" +
                "<div class='input-group'>" +
                "<div class='input-group-btn'>" +
                "<button type='button' class='btn btn-default'>" + label + "</button>" +
                dropdown_btn_box +
                "</div>" +
                "<input type='number' id ='" + input_name + "'class='form-control' style='width:200px' />" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            this.append(num_box);

            var filter_object = {
                no: no,
                type: "Num",
                method: "=",
                value: "",
                status: 0
            };

            methods.filter.push(filter_object);
            methods.event_element.push($("#" + input_name));

            $("#" + num_box_select).children("li").on("click", function (event) {
                $(this).parent().prev().text($(this).text());
                filter_object.method = $(this).text();
            });

            $("#" + input_name).on("update", function () {
                filter_object.value = $(this).val();
                filter_object.status = filter_object.value.trim().length > 0 ? 1 : 0;
            });

            $("#" + num_box_select).children("li").hover(
                function () {
                    $(this).css("color", "white");
                    $(this).css("background-color", "gray");
                },
                function () {
                    $(this).css("color", "black");
                    $(this).css("background-color", "white");
                }
            );

            return this;
        },
        /**
         * 建构日期型过滤器
         * @param no 字段於DataTable的编号
         * @param label 字段名称
         * @returns this
         */
        build_datetime_box: function (no, label) {
            var random = Math.floor((Math.random() * 1000) + 1);
            var datetime_box_select = "datetime_box_select_" + random + "_db";
            var input_name = "datetime_box_input_" + random + "_db";
            var dropdown_btn_box = "<div class='btn-group dropdown-submenu'>" +
                " <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>= " +
                "</button> " +
                "<ul id='" + datetime_box_select + "'class='dropdown-menu'> " +
                "<li class='text-center'>=</li> " +
                "<li class='text-center'>></li> " +
                "<li class='text-center'><</li> " +
                "</ul> </div>";
            var datetime_box =
                "<div class='row'>" +
                "<div class='col-sm-5'>" +
                "<div class='form-group'>" +
                "<div class='input-group date' id='datetimepicker1'>" +
                "<div class='input-group-btn'>" +
                "<button type='button' class='btn btn-default'>" + label + "</button>" +
                dropdown_btn_box +
                "</div>" +
                "<input id='" + input_name + "'type='text' class='form-control' style='width:200px' />" +
                "<span class='input-group-addon'>" +
                "<span class='glyphicon glyphicon-calendar'></span>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            this.append(datetime_box);

            $(".date").datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss'
            });

            var filter_object = {
                no: no,
                type: "DateTime",
                method: "=",
                value: "",
                status: 0
            };

            methods.filter.push(filter_object);
            methods.event_element.push($("#" + input_name));

            $("#" + datetime_box_select).children("li").on("click", function (event) {
                $(this).parent().prev().text($(this).text());
                filter_object.method = $(this).text();
            });

            $("#" + input_name).on("update", function () {
                filter_object.value = $(this).val();
                filter_object.status = filter_object.value.trim().length > 0 ? 1 : 0;
            });

            $("#" + datetime_box_select).children("li").hover(
                function () {
                    $(this).css("color", "white");
                    $(this).css("background-color", "gray");
                },
                function () {
                    $(this).css("color", "black");
                    $(this).css("background-color", "white");
                }
            );

            return this;
        },
        /**
         * 文字型控制器，提供绝对匹配和模糊匹配两种过滤类型
         * @param no 字段於DataTable的编号
         * @param label 字段名称
         * @returns this
         */
        build_text_box: function (no, label) {
            var random = Math.floor((Math.random() * 1000) + 1);
            var text_box_select = "text_box_select_" + random + "_tb";
            var input_name = "text_box_input_" + random + "_tb";
            var dropdown_btn_box = "<div class='btn-group dropdown-submenu'>" +
                " <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>绝对 " +
                "</button> " +
                "<ul id ='" + text_box_select + "' class='dropdown-menu'> " +
                "<li class='text-center' li-type = '0'> 绝对 </li> " +
                "<li class='text-center' li-type = '1'> 模糊 </li> " +
                "</ul> </div>";
            var datetime_box =
                "<div class='row'>" +
                "<div class='col-sm-5'>" +
                "<div class='form-group'>" +
                "<div class='input-group'>" +
                "<div class='input-group-btn'>" +
                "<button type='button' class='btn btn-default'>" + label + "</button>" +
                dropdown_btn_box +
                "</div>" +
                "<input id = '" + input_name + "'type='text' class='form-control' style='width:200px' />" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            this.append(datetime_box);

            var filter_object = {
                no: no,
                type: "Text",
                method: "0",
                value: "",
                status: 0
            };

            methods.filter.push(filter_object);
            methods.event_element.push($("#" + input_name));

            $("#" + text_box_select).children("li").on("click", function (event) {
                $(this).parent().prev().text($(this).text());
                filter_object.method = $(this).attr("li-type");
            });

            $("#" + input_name).on("update", function () {
                filter_object.value = $(this).val();
                filter_object.status = filter_object.value.trim().length > 0 ? 1 : 0;
            });

            $("#" + text_box_select).children("li").hover(
                function () {
                    $(this).css("color", "white");
                    $(this).css("background-color", "gray");
                },
                function () {
                    $(this).css("color", "black");
                    $(this).css("background-color", "white");
                }
            );

            return this;
        },
        /**
         * 状态型过滤器，此类型过滤器只要存在就一定会生效(这里指的是一定会送出过滤资料到後端)
         * @param no 字段於DataTable的编号
         * @param label 字段名称
         * @param status_arr 提供的状态选项
         * @returns this
         */
        build_status_box: function (no, label, status_arr) {
            var random = Math.floor((Math.random() * 1000) + 1);
            var status_box_select = "status_box_select_" + random + "_sb";
            var status_item = "";
            for (i = 0; i < Object.getOwnPropertyNames(status_arr).length; i++) {
                status_item += "<li class='text-center' li-type ='" + i + "'>" + status_arr[i] + "</li> ";
            }
            var dropdown_btn_box = "<div class='btn-group dropdown-submenu'>" +
                " <button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                status_arr[0] +
                "</button> " +
                "<ul id='" + status_box_select + "'class='dropdown-menu'> " +
                status_item +
                "</ul> </div>";
            var datetime_box =
                "<div class='row'>" +
                "<div class='col-sm-5'>" +
                "<div class='form-group'>" +
                "<div class='input-group'>" +
                "<div class='input-group-btn'>" +
                "<button type='button' class='btn btn-default'>" + label + "</button>" +
                dropdown_btn_box +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            this.append(datetime_box);

            var filter_object = {
                no: no,
                type: "Status",
                method: "0",
                value: "",
                status: 1
            };

            methods.filter.push(filter_object);
            methods.event_element.push(null);

            $("#" + status_box_select).children("li").on("click", function (event) {
                $(this).parent().prev().text($(this).text());
                filter_object.method = $(this).attr("li-type");
            });

            $("#" + status_box_select).children("li").hover(
                function () {
                    $(this).css("color", "white");
                    $(this).css("background-color", "gray");
                },
                function () {
                    $(this).css("color", "black");
                    $(this).css("background-color", "white");
                }
            );


            return this;
        },
        show: function () {
            this.show();
        },
        hide: function () {
            this.hide();
        },
        log: function () {
            if (methods.filter.length == 0) {
                $.error("not anymore filter_object.");
            }
            console.log(methods.filter);

        },
        update: function () {
            for (var i = 0; i < methods.filter.length; i++) {
                if (methods.filter[i].type != "Status") {
                    methods.event_element[i].trigger("update");
                }
            }
        },
        draw_table: function () {
            methods.update();
            var table = methods.settings.table;

            for (var i = 0; i < methods.filter.length; i++) {
                if (methods.filter[i].status != 0) {
                    table
                        .columns(methods.filter[i].no)
                        .search(JSON.stringify(methods.filter[i]), true);
                }
            }
            table.draw();
        }
    };
    $.fn.dataTableSearchBox = function (method) {
        if (methods[method]) {
            if (methods.settings == undefined || methods.settings == null) {
                $.error("jQuery.dataTableSearchBox not init()");
            }
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.dataTableSearchBox');
        }


    };
})(jQuery);