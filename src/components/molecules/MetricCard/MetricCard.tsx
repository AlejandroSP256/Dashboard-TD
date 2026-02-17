import React from 'react'
import { Card, CardContent } from '@/components/atoms/Card/Card'
import { Typography } from '@/components/atoms/Typography/Typography'
import { TrendIndicator } from '@/components/atoms/TrendIndicator/TrendIndicator'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils'

export interface MetricCardProps {
    title: string;
    value: number;
    previousValue: number;
    unit: 'currency' | 'percentage' | 'number';
    formatOptions?: Intl.NumberFormatOptions;
    isLoading?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    previousValue,
    unit,
    formatOptions,
    isLoading = false,
    className,
    style
}) => {
    const calculateChange = (current: number, previous: number): number => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100
    }

    const formatValue = (val: number): string => {
        switch (unit) {
            case 'currency':
                return formatCurrency(val)
            case 'percentage':
                return formatPercentage(val)
            case 'number':
                return new Intl.NumberFormat('es-ES', formatOptions).format(val)
            default:
                return val.toString()
        }
    }

    const change = calculateChange(value, previousValue)

    if (isLoading) {
        return (
            <Card className={className}>
                <CardContent className='p-4'>
                    <div className='h-4 bg-gray-200 rounded w-1/2 mb-2' />
                    <div className='h-6 bg-gray-200 rounded w-3/4 mb-2' />
                    <div className='h-3 bg-gray-200 rounded w-1/3' />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn('hover:shadow-md transition-shadow', className)} style={style}>
            <CardContent className='p-4'>
                <Typography variant='label' color='muted' className='mb-1'>
                    {title}
                </Typography>

                <div className='flex items-baseline justify-between mb-2'>
                    <Typography variant='h3' className='text-gray-900'>
                        {formatValue(value)}
                    </Typography>
                    <TrendIndicator value={change} size='sm' />
                </div>

                <Typography variant='caption' color='muted'>
                    Anterior: {formatValue(previousValue)}
                </Typography>
            </CardContent>
        </Card>
    )
}