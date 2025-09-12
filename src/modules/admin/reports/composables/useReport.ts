import { clientApi } from "@/plugins/axiosPlugin"
import { message } from "ant-design-vue"

export const useReport = () => {
    const exportExcelYear = async (year: string) => {
        try {
            const response = await clientApi.get(`/reports/excel`, {
                params: { year },
                responseType: "blob", // สำคัญ! บอกให้ axios รับเป็นไฟล์
            })

            // สร้าง blob จาก response
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
            const url = window.URL.createObjectURL(blob)

            // สร้าง <a> สำหรับดาวน์โหลดไฟล์
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `report-${year}.xlsx`) // ตั้งชื่อไฟล์
            document.body.appendChild(link)
            link.click()

            // เคลียร์ object url หลังใช้เสร็จ
            window.URL.revokeObjectURL(url)
            document.body.removeChild(link)
        } catch (error: any) {
            message.error(error.response?.data?.message || "ເກີດຂໍ້ຜິດພາດ")
        }
    }

    return { exportExcelYear }
}
