import React from 'react'
import { cn } from '@/lib/utils'
import { LineChart } from '@/components/molecules'
import { TimeRangeSelector } from '@/components/molecules'
import { Typography } from '@/components/atoms'
import { useDashboard } from '@/hooks/useDashboard'

export interface ChartSectionProps {
    className?: string;
    charts?: string[];
    title?: string;
}

export const ChartSection: React.FC<ChartSectionProps> = ({
    className,
    charts = ['revenue', 'conversion', 'users'],
    title = 'Analiticas en Tiempo Real'
}) => {
    const {
        chartData,
        filters,
        isLoading,
        error,
        handleTimeRangeChange
    } = useDashboard()

    const getChartData = (chartType: string) => {
        if (!chartData) return null

        switch (chartType) {
            case 'revenue':
                return {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: 'Ingresos',
                            data: chartData.datasets[0].data,
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true
                        }
                    ]
                }
            case 'conversion':
                return {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: 'Tasa de Conversion',
                            data: chartData.datasets[0].data.map(value => value * 0.1),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true
                        }
                    ]
                }
            case 'users':
                return {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: 'Usuarios activos',
                            data: chartData.datasets[0].data.map(value => value + 2),
                            borderColor: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            fill: true
                        }
                    ]
                }
            default:
                return null
        }
    }

    const chartTitles = {
        revenue: 'Evolucion de ingresos',
        conversion: 'Tasa de conversion',
        users: 'Usuarios activos'
    }

    return (
        <section className={cn('space-y-6', className)}>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center'>
                <div>
                    <Typography variant='h2' className='text-gray-900'>
                        {title}
                    </Typography>
                    <Typography variant='body' color='muted' className='mt-1'>
                        Datos actualizados en tiempo real segun el rango seleccionado
                    </Typography>
                </div>

                <TimeRangeSelector
                    selectedRange={filters.timeRange}
                    onRangeChange={handleTimeRangeChange}
                    className='mt-4 sm:mt-0'
                />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {charts.map((chartType, index) => {
                    const data = getChartData(chartType)

                    return (
                        <LineChart
                            key={chartType}
                            title={chartTitles[chartType as keyof typeof chartTitles]}
                            data={data || { labels: [], datasets: [] }}
                            isLoading={isLoading}
                            error={error}
                            className='animate-fade-in'
                            style={{
                                animationDelay: `${index + 200}ms`
                            }}
                        />
                    )
                })}
            </div>

            {error && (
                <div className='text-center py-12'>
                    <Typography variant='h4' color='error' className='mb-2'>
                        Error al cargar los datos
                    </Typography>
                    <Typography variant='body' color='muted'>
                        {error}
                    </Typography>
                </div>
            )}
        </section>
    )
}