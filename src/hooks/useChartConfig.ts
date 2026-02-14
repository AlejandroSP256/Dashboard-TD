'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { useEffect } from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export interface ChartConfig {
    type: 'line' | 'bar';
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor?: string;
        backgroundColor?: string;
        fill?: boolean;
    }[];
    options?: any;
}

export const useChartConfig = () => {
    useEffect(() => {
        ChartJS.defaults.font.family = 'Inter, system-ui, sans-serif';
        ChartJS.defaults.color = '#687280';
        ChartJS.defaults.borderColor = 'rbga(229, 231, 235, 0.5)';
    }, [])

    const getDefaultOptions = (title: string): any => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    usePointStyle: true,
                    padding: 15
                }
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                    weight: '600'
                }
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(255,255,255,0.95)',
                titleColor: '#1f2937',
                bodyColor: '374151',
                borderColor: '#e5e9eb',
                borderWidth: 1,
                cornerRadius: 6,
                displayColors: true,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('es-ES').format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(229, 231, 235, 0.5)'
                },
                ticks: {
                    callback: function(value: any) {
                        return new Intl.NumberFormat('es-ES', {
                            notation: 'compact',
                            compactDisplay: 'short'
                        }).format(value)
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'linear'
            }
        }
    })

    const colorPalette = {
        primary: '#3b82f6',
        secondary: '#10b981',
        tertiary: '#f59e0b',
        quaternary: '#ef4444',
        background: '#rgba(59, 130, 246, 0.1)'
    }

    return {
        getDefaultOptions,
        colorPalette
    }
}