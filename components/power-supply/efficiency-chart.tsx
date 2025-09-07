"use client"

import React from 'react'
import ReactECharts from 'echarts-for-react'
import { useTheme } from '@/components/theme/theme-provider'

interface EfficiencyChartProps {
  data: {
    load: number
    efficiency: number
  }[]
}

interface TooltipParams {
  value: [number, number]
  axisValue: string
}

const EfficiencyChart: React.FC<EfficiencyChartProps> = ({ data }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // 根据主题获取颜色
  const getColors = () => {
    if (isDark) {
      return {
        background: 'oklch(0.216 0.006 56.043)', // --background
        text: 'hsl(60 9.1% 97.8%)', // --foreground
        grid: 'hsl(12 6.5% 15.1%)', // --border
        line: 'hsl(220 70% 50%)', // --chart-1
        tooltip: {
          background: 'hsl(20 14.3% 4.1%)', // --popover
          text: 'hsl(60 9.1% 97.8%)', // --popover-foreground
          border: 'hsl(12 6.5% 15.1%)', // --border
        }
      }
    } else {
      return {
        background: 'hsl(0 0% 100%)', // --background
        text: 'hsl(20 14.3% 4.1%)', // --foreground
        grid: 'hsl(20 5.9% 90%)', // --border
        line: 'hsl(12 76% 61%)', // --chart-1
        tooltip: {
          background: 'hsl(0 0% 100%)', // --popover
          text: 'hsl(20 14.3% 4.1%)', // --popover-foreground
          border: 'hsl(20 5.9% 90%)', // --border
        }
      }
    }
  }

  const colors = getColors()

  const option = {
    backgroundColor: colors.background,
    tooltip: {
      trigger: 'axis',
      backgroundColor: colors.tooltip.background,
      borderColor: colors.tooltip.border,
      borderWidth: 1,
      textStyle: {
        color: colors.tooltip.text,
      },
      formatter: (params: TooltipParams[]) => {
        const param = params[0]
        return `<span style="color: ${colors.tooltip.text}">负载: ${param.axisValue}%</span><br/>` +
          `<span style="color: ${colors.tooltip.text}">效率: ${param.value[1]}%</span>`
      },
    },
    grid: {
      left: '2%',
      right: '9%',
      bottom: '3%',
      top: '9%',
      containLabel: true,
      borderColor: colors.grid,
    },
    xAxis: {
      type: 'value',
      name: '负载 (%)',
      nameTextStyle: {
        color: colors.text,
      },
      axisLabel: {
        color: colors.text,
        formatter: '{value}%',
      },
      axisLine: {
        lineStyle: {
          color: colors.grid,
        },
      },
      splitLine: {
        lineStyle: {
          color: colors.grid,
        },
      },
      min: 0,
      max: 140,
    },
    yAxis: {
      type: 'value',
      name: '效率 (%)',
      nameTextStyle: {
        color: colors.text,
      },
      axisLabel: {
        color: colors.text,
      },
      axisLine: {
        lineStyle: {
          color: colors.grid,
        },
      },
      splitLine: {
        lineStyle: {
          color: colors.grid,
        },
      },
      min: 65,
      max: 100,
    },
    series: [
      {
        name: '效率',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: colors.line,
          width: 3,
        },
        itemStyle: {
          color: colors.line,
        },
        emphasis: {
          lineStyle: {
            color: colors.line,
            width: 4,
          },
          itemStyle: {
            color: colors.line,
            borderColor: colors.line,
            borderWidth: 2,
          },
        },
        data: data.map((d) => [d.load, d.efficiency]),
      },
    ],
  }

  return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
}

export default EfficiencyChart