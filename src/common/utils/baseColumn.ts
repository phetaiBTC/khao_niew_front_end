import type { TableColumnsType } from "ant-design-vue"
interface BaseColumn {
    dataIndex: string
    align?: "left" | "center" | "right"
    width?: number
    fixed?: "left" | "right"
    ellipsis?: boolean,
    sorter?: boolean
}

export class BaseColumns<T> {
    protected columns: TableColumnsType<T> = [
        {
            title: "ລໍາດັບ",
            key: "index",
            dataIndex: "index",
            align: "center",
            width: 70,
            customRender: ({ index }) => index + 1
        }
    ]
    constructor(initialColumns?: BaseColumn[]) {
        if (initialColumns) {
            this.columns.push(...initialColumns.map(col => ({
                key: col.dataIndex,
                dataIndex: col.dataIndex,
                title: col.dataIndex,
                align: col.align || "left",
                width: col.width,
                fixed: col.fixed,
                ellipsis: col.ellipsis,
                sorter: col.sorter
            })), {
                title: "ສ້າງເມື່ອ",
                key: "created_At",
                dataIndex: "created_At",
                align: "center",
                width: 150
            },
                {
                    title: "ແກ້ໄຂເມື່ອ",
                    key: "updated_At",
                    dataIndex: "updated_At",
                    align: "center",
                    width: 150
                })

        }
    }

    getColumns(): TableColumnsType<T> {
        return this.columns
    }

    addColumn(column: BaseColumn) {
        this.columns.push({
            key: column.dataIndex,
            dataIndex: column.dataIndex,
            title: column.dataIndex,
            align: column.align || "left",
            width: column.width,
            fixed: column.fixed,
            ellipsis: column.ellipsis,
            sorter: column.sorter
        })
    }

    removeColumnByKey(key: string) {
        this.columns = this.columns.filter(col => col.key !== key)
    }

    resetColumns(newColumns: TableColumnsType<T>) {
        this.columns = newColumns
    }
}
