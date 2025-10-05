export interface MonthlyRevenue {
  year: number
  month: number
  details: RevenueDetail[]
}

export interface RevenueDetail {
  date: string
  user: User
  company: Company
  total_bookings: number
  total_people: number
  unit_price: number
  total_revenue: number
}

export interface User {
  id: number
  name: string
}

export interface Company {
  id: number
  name: string
}
