import { ReactNode } from 'react'

export interface DashboardContextModel {
  content: string
  setContent: (mark: string) => void
}

export interface DashboardProviderModel {
  children: ReactNode
}
