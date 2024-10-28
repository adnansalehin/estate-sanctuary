'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { ThemeToggle } from '@/components/ThemeToggle'
import { cn } from '@/lib/utils'

// Define navigation items with unique IDs
const navItems = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'demo', path: '/demo', label: 'Demo' }
]

export function Navigation() {
  const pathname = usePathname()
  const { isDarkTheme } = useTheme()

  return (
    <nav className={cn(
      'fixed w-full z-50 top-0 px-4 py-3 transition-colors duration-300',
      isDarkTheme ? 'bg-[#013639] text-white' : 'bg-white text-[#024e52]',
      'border-b',
      isDarkTheme ? 'border-[#024e52]' : 'border-gray-200'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            Estate Sanctuary
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.map(item => (
              <Link 
                key={item.id}
                href={item.path} 
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium',
                  pathname === item.path ? (
                    isDarkTheme ? 'bg-[#024e52] text-white' : 'bg-gray-100 text-[#024e52]'
                  ) : 'hover:opacity-80'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}