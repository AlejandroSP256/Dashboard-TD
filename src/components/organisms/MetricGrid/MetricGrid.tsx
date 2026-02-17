import React from 'react'
import { cn } from '@/lib/utils'
import { MetricCard } from '@/components/molecules'
import { LoadingSkeleton } from '@/components/molecules'
import { useDashboard } from '@/hooks/useDashboard'
import { Typography } from '@/components/atoms'

export interface MetricGridProps {
    className?: string;
    metricsFilter?: string[];
    layout?: 'auto' | 'compact' | 'spacious';
}

export const MetricGrid: React.FC<MetricGridProps> = ({
    className,
    metricsFilter,
    layout = 'auto'
}) => {
    const { metrics, isLoading } = useDashboard()

    const layoutClasses = {
        auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        compact: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
        spacious: 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
    }

    const filteredMetrics = metricsFilter
        ? metrics.filter(metric => metricsFilter.includes(metric.name))
        : metrics

    if (isLoading) {
        return (
            <div
                className={cn('grid gap-4', layoutClasses[layout],className)}>
                    <LoadingSkeleton type='metric' count={6} />
            </div>
        )
    }

    if (filteredMetrics.length === 0) {
        return (
            <div className={cn(
                'flex items-center justify-center py-12 px-6 rounded-lg border-2 border-dashed border-gray-300',
                className
            )}>
                <div className='text-center'>
                    <Typography variant='h4' color='muted' className='mb-2'>
                        No hay metricas disponibles
                    </Typography>
                    <Typography variant='body' color='muted'>
                        Selecciona un rango de tiempo diferente o verifica la conexion
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div className={cn('grid gap-4', layoutClasses[layout], className)}>
            {filteredMetrics.map((metric) => (
                <MetricCard
                    key={metric.id}
                    title={metric.name}
                    value={metric.value}
                    previousValue={metric.previousValue}
                    unit={metric.unit}
                    className='animate-fade-in'
                    style={{
                        animationDelay: `${filteredMetrics.indexOf(metric) + 100}ms`
                    }}
                />
            ))}
        </div>
    )
}