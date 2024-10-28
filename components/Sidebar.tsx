'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PropertyDetailsType } from '@/app/types'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

type SidebarProps = {
  properties: PropertyDetailsType[]
  selectedProperty: PropertyDetailsType | null
  onPropertySelect: (property: PropertyDetailsType) => void
  isDarkTheme?: boolean
}

export function Sidebar({ properties, selectedProperty, onPropertySelect, isDarkTheme = false }: SidebarProps) {
  const { isCollapsed, setIsCollapsed } = useTheme()

  return (
    <div
      className={cn(
        'h-screen fixed left-0 top-0 pt-14 z-40 transition-all duration-300', // Added pt-14 for navigation bar height
        isDarkTheme ? 'bg-[#013639] text-white' : 'bg-white text-[#024e52]',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-16 rounded-full bg-white shadow-md" // Adjusted top position
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="p-4">
        <h2 className={cn(
          "font-semibold mb-4",
          isCollapsed ? "text-center text-sm" : "text-xl"
        )}>
          {isCollapsed ? "Props" : "Properties"}
        </h2>
        <div className="space-y-2">
          {properties.map((property) => (
            <button
              key={property._id}
              onClick={() => onPropertySelect(property)}
              className={cn(
                'w-full p-2 rounded-lg transition-colors text-left',
                isDarkTheme
                  ? 'hover:bg-[#024e52] focus:bg-[#024e52]'
                  : 'hover:bg-gray-100 focus:bg-gray-100',
                selectedProperty?._id === property._id && (
                  isDarkTheme
                    ? 'bg-[#024e52]'
                    : 'bg-gray-100'
                ),
                isCollapsed && 'flex justify-center'
              )}
            >
              {isCollapsed ? (
                <span className="text-xs">{property.price}</span>
              ) : (
                <div>
                  <div className="font-medium truncate">{property.address}</div>
                  <div className="text-sm opacity-70">{property.price}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}