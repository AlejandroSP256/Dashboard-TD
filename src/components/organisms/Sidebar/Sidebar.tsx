'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/atoms'
import { Card } from '@/components/atoms'
import {
    ChartBar,
    Home,
    Users,
    Cog,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'

export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    badge?: number;
    isActive?: boolean;
}

export interface SidebarProps {
    className?: string;
    onItemClick?: (itemId: string) => void;
}

const navigationItems: SidebarItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard Principal',
        icon: Home,
        href: '/dashboard',
        isActive: true
    },
    {
        id: 'analytics',
        label: 'Analiticas',
        icon: ChartBar,
        href: '/analytics',
        badge: 3
    },
    {
        id: 'customers',
        label: 'Clientes',
        icon: Users,
        href: '/customers'
    },
    {
        id: 'settings',
        label: 'Configuracion',
        icon: Cog,
        href: '/settings'
    }
]

export const Siderbar: React.FC<SidebarProps> = ({
    className,
    onItemClick
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [activeItem, setActiveItem] = useState('dashboard')

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId)
        onItemClick?.(itemId)
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <Card
            className={cn(
                'fixed left-0 top-0 h-full z-40 transition-all duration-300',
                'border-r border-gray-200 rounded-none shadow-lg',
                isCollapsed ? 'w-16' : 'w-64',
                className
            )}
            shadow='none'
            border={false}
        >
            {/* Header del Sidebar */}
            <div className={cn(
                'flex items-center border-b border-gray-100 p-4',
                isCollapsed ? 'justify-center' : 'justify-between'
            )}>
                {!isCollapsed && (
                    <Typography variant='h3' className='text-primary-600'>
                        BizDash
                    </Typography>
                )}

                <button
                    onClick={toggleCollapse}
                    className={cn(
                        'p-1 rounded-lg hover:bg-gray-100 transition-colors',
                        'focus:outline-none focus:ring-2 focus:ring-primary-300'
                    )}
                >
                    {isCollapsed ? (
                        <ChevronRight className='h-5 w-5 text-gray-600' />
                    ) : (
                        <ChevronLeft className='h-5 w-5 text-gray-600' />
                    )}
                </button>

                {/* Navegacion */}
                <nav className='mt-6'>
                    <ul className='space-y-1 px-2'>
                        {navigationItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeItem === item.id

                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleItemClick(item.id)}
                                        className={cn(
                                            'w-full flex items-center rounded-lg px-3 py-2 transition-all',
                                            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300',
                                            isActive
                                                ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                                                : 'text-gray-700'
                                        )}
                                    >
                                        <Icon className={cn(
                                            'h-5 w-5 shrink-0',
                                            isActive ? 'text-primary-600' : 'text-gray-400'
                                        )} />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </Card>
    )
}