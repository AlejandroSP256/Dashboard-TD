import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Metric, ChartData, DashboardFilters, TimeRange } from '@/types/dashboard'

interface DashboardState {
    metrics: Metric[];
    chartData: ChartData | null;
    filters: DashboardFilters;
    isLoading: boolean;
    error: string | null;

    setFilters: (filters: Partial<DashboardFilters>) => void;
    setTimeRange: (timeRange: TimeRange) => void;
    fetchMetrics: () => Promise<void>;
    fetchChartData: (timeRange: TimeRange) => Promise<void>;
    resetError: () => void;
}

// datos mock para desarrollo

const initialMetrics: Metric[] = [
    {
        id: 'revenue',
        name: 'Ingresos totales',
        value: 125430,
        previousValue: 118200,
        unit: 'currency',
        timestamp: new Date()
    },
    {
        id: 'conversion',
        name: 'Tasa de conversion',
        value: 4.3,
        previousValue: 3.8,
        unit: 'percentage',
        timestamp: new Date()
    }
]

export const useDashboardStore = create<DashboardState>() (
    devtools(
        persist(
            (set, get) => ({
                metrics: initialMetrics,
                chartData: null,
                filters: {
                    'timeRange': '7d',
                    'compareWithPrevious': false
                },
                isLoading: false,
                error: null,

                setFilters: (newFilters) => {
                    set((state) => ({
                        filters: { ...state.filters, ...newFilters }
                    }))
                },

                fetchMetrics: async () => {
                    set({ isLoading: true, error: null });

                    try {
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        set({ metrics: initialMetrics, isLoading: false });
                    } catch (error) {
                        set({
                            error: 'Error al cargar las metricas',
                            isLoading: false
                        })
                    }
                },

                fetchChartData: async (timeRange) => {
                    set({ isLoading: true });

                    try {
                        const mockChartData: ChartData = {
                            labels: generateLabels(timeRange),
                            datasets: [
                                {
                                    label: 'Ventas',
                                    data: generateRandomData(timeRange),
                                    borderColor: '#3b82f6',
                                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                                }
                            ]
                        };

                        await new Promise(resolve => setTimeout(resolve, 800))
                        set({ chartData: mockChartData, isLoading: false })
                    } catch (error) {
                        set({
                            error: 'Error al cargar los datos del grafico',
                            isLoading: false
                        })
                    }
                },

                resetError: () => set({ error: null })
            }),
            {
                name: 'dashboard-store',
                partialize: (state) => ({ filters: state.filters })
            }
        )
    )
)

function generateLabels(timeRange: TimeRange): string[] {
    const ranges = {
        '24h': Array.from({ length: 24 }, (_, i) => `${i}h`),
        '7d': ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        '30d': Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        '90d': Array.from({ length: 12}, (_, i) => `Sem ${i + 1}`)
    }
    return ranges[timeRange]
}

function generateRandomData(timeRange: TimeRange): number[] {
    const length = generateLabels(timeRange).length
    return Array.from({ length }, () => 
        Math.floor(Math.random() * 1000) + 500
    )
}