'use client'

import React, { useState} from 'react'
import { cn } from '@/lib/utils'
import { Typography } from '@/components/atoms'
import { Button } from '@/components/atoms'
import {
    SearchIcon,
    BellIcon,
    PlusIcon,
    UserCircle2 as UserCircleIcon
} from 'lucide-react'

export interface HeaderProps {
    title: string;
    subtitle?: string;
    onSearch?: (query: string) => void;
    onNotificationClick?: () => void;
    onAddClick?: () => void;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    onSearch,
    onNotificationClick,
    onAddClick,
    className
}) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSearch?.(searchQuery)
    }

    return (
        <header className={cn(
            'bg-white border-b border-gray-200 sticky top-0 z-30',
            className
        )}>
            <div className='px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex-1 min-w-0'>
                        <Typography variant='h2' className='text-gray-900'>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant='caption' color='muted' className='mt-1'>
                                {subtitle}
                            </Typography>
                        )}
                    </div>
                    <form onSubmit={handleSearch} className='flex-1 max-w-md mx-8'>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <SearchIcon className='h-5 w-5 text-gray-400' />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='buscar metricas, informes...'
                                className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                                     bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500
                                     focus:border-primary-500 transition-colors`}
                            />
                        </div>
                    </form>

                    <div className='flex items-center space-x-3'>
                        <Button
                            variant='primary'
                            size='sm'
                            onClick={onAddClick}
                            className='hidden sm:flex'
                        >
                            <PlusIcon className='h-4 w-4 mr-2' />
                            Nuevo Informe
                        </Button>

                        <button
                            onClick={onNotificationClick}
                            className={`relative p-2 text-gray-400 hover:text-gray-600
                                    rounded-lg hover:bg-gray-100 transition-colors
                                    focus:outline-none focus:ring-2 focus:ring-primary-300`}
                        >
                            <BellIcon className='h-5 w-5' />
                            <span className='absolute -top-1 -right-1 flex h-3 w-3'>
                                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75' />
                                <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500' />
                            </span>
                        </button>
                        <button
                            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-color
                                focus:outline-none focus:ring-2 focus:ring-primary-300`}>
                                <UserCircleIcon className='h-8 w-8 text-gray-400' />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}