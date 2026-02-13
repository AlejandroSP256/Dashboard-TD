'use client';

import { useDashboard } from "@/hooks/useDashboard";
import { Button } from "@/components/atoms/Button";

export default function HomePage() {
  const { metrics, isLoading, fetchMetrics } = useDashboard()

  return (
    <div className="min-h-screen bg-dashboard-background p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Dashboard Empresarial
      </h1>

      <Button
        onClick={fetchMetrics}
        isLoading={isLoading}
        variant="primary"
      >
        Cargar metricas
      </Button>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">{metric.name}</h3>
            <p className="text-2xl font-bold">
              {metric.unit === 'currency' ? '$' : ''}{metric.value}
              {metric.unit === 'percentage' ? '%' : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}