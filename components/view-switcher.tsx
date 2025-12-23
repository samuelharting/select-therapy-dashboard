'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { List, Kanban } from 'lucide-react'

interface ViewSwitcherProps {
  value: string
  onValueChange: (value: string) => void
}

export function ViewSwitcher({ value, onValueChange }: ViewSwitcherProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="list" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          List View
        </TabsTrigger>
        <TabsTrigger value="board" className="flex items-center gap-2">
          <Kanban className="h-4 w-4" />
          Board View
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

