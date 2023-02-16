/*
 * @Author: Yanc
 * @Date: 2022-12-16 10:46:37
 * @LastEditTime: 2023-02-16 18:13:24
 */
export const basicComponents = [
  {
    type: "input",
    label: "文本输入框",
    filedName: "",
    defaultValue: "",
    placeholder: "请输入",
    options: {
      required: false,
      dataType: "string",
      disabled: false,
      maxlength: -1,
      showWordLimit: false,
    },
  },
  {
    type: "select",
    label: "下拉选择框",
    filedName: "",
    defaultValue: "",
    placeholder: "请选择",
    options: {
      staticOptions: [
        {
          label: "Option",
          value: "Option 1",
        },
        {
          label: "Option",
          value: "Option 2",
        },
        {
          label: "Option",
          value: "Option 3",
        },
      ],
      remoteOptions: {
        url: "get_tree_list",
        method: "get",
        param: {},
        optionMapping: {
          id: "",
          title: "",
          value: "",
          label: "",
        },
      },
    },
  },
  {
    type: "treeSelect",
    label: "树选择框",
    filedName: "",
    defaultValue: "",
    placeholder: "请选择",
    options: {
      staticOptions: [
        {
          value: "Option 1",
        },
        {
          value: "Option 2",
        },
        {
          value: "Option 3",
        },
      ],
      remoteOptions: {
        url: "get_tree_list",
        method: "get",
        param: {},
        optionMapping: "",
      },
    },
  },
];

export const layoutComponents = [
  {
    type: "grid",
    icon: "icon-grid-",
    columns: [
      {
        span: 12,
        list: [],
      },
      {
        span: 12,
        list: [],
      },
    ],
    options: {
      gutter: 0,
      justify: "start",
      align: "top",
    },
  },
];
