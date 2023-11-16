<template>
  <basic-container>
    <avue-crud
        :option="option"
        :table-loading="loading"
        :data="data"
        :page.sync="page"
        v-model="form"
        ref="crud"
    >
    </avue-crud>
  </basic-container>
</template>

<script>
export default {
  data () {
    return {
      form: {},
      query: {},
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: {
        column: [
          {
            label: "区域名称",
            prop: "districtsCountiesId",
            search: true,
            type: 'tree',
            dicData: [
              { id: 11, title: "99999999999999" }
            ],
            // dicUrl: "/api/blade-system/dept/dept",
            lazy: true,
            value: 11,
            nodeKey: 'id',
            // defaultExpandedKeys: ['1'],
            // treeLoad: (node, resolve) => {
            //   const parentId = (node.level === 0) ? undefined : node.data.id;
            // },
            // dicFormatter: (data) => {
            //   return data.data
            // },
            // change: ({ value, label }) => {
            //   console.log("触发区域名称：", value, label)
            //   if (value) {
            //     this.findObject(this.option.column, 'unitId').dicUrl = '/api/blade-system/dept/deptTree?deptType=3&parentId={{districtsCountiesId}}'
            //   }
            // },
            props: {
              label: "title",
              value: "id"
            },
          },
        ]
      },
      data: []
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style>
</style>
